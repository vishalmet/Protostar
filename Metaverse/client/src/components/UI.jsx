import { atom, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import desc from '../assets/images/desc.png'
import { AvatarCreator } from "@readyplayerme/react-avatar-creator";
import { motion } from "framer-motion";
import { roomItemsAtom } from "./Room";
import { roomIDAtom, socket } from "./SocketManager";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Goldcoin from '../assets/goldcoin.png';
import Diamond from "../assets/diamond.png";
import eth from "../assets/gray ethereum logo.png";

export const buildModeAtom = atom(false);
export const shopModeAtom = atom(false);
export const draggedItemAtom = atom(null);
export const draggedItemRotationAtom = atom(0);

export const avatarUrlAtom = atom(
  "https://api.avaturn.me/avatars/exports/01927047-4345-7c9f-b805-15885643b520/model"
);

const PasswordInput = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // TODO: To make things properly we should have a loading state 😊

  const checkPassword = () => {
    socket.emit("passwordCheck", password);
  };

  useEffect(() => {
    socket.on("passwordCheckSuccess", () => {
      onSuccess();
      onClose();
    });
    socket.on("passwordCheckFail", () => {
      setError("Wrong password");
    });
    return () => {
      socket.off("passwordCheckSuccess");
      socket.off("passwordCheckFail");
    };
  });

  return (
    <div className="fixed z-10 grid place-items-center w-full h-full top-0 left-0">
      <div
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-4 z-10">
        <p className="text-lg font-bold">Password</p>
        <input
          autoFocus
          type="text"
          className="border rounded-lg p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="space-y-2 mt-2">
          <button
            className="bg-green-500 text-white rounded-lg px-4 py-2 flex-1 w-full"
            onClick={checkPassword}
          >
            Enter
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export const UI = () => {
  const [buildMode, setBuildMode] = useAtom(buildModeAtom);
  const [shopMode, setShopMode] = useAtom(shopModeAtom);
  const [draggedItem, setDraggedItem] = useAtom(draggedItemAtom);
  const [draggedItemRotation, setDraggedItemRotation] = useAtom(
    draggedItemRotationAtom
  );
  const [_roomItems, setRoomItems] = useAtom(roomItemsAtom);
  const [passwordMode, setPasswordMode] = useState(false);
  const [avatarMode, setAvatarMode] = useState(false);
  const [avatarUrl, setAvatarUrl] = useAtom(avatarUrlAtom);
  const [roomID, setRoomID] = useAtom(roomIDAtom);
  const [passwordCorrectForRoom, setPasswordCorrectForRoom] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = async () => {
    // Get the `userid` from localStorage
    const userid = localStorage.getItem('userid');

    if (userid) {
      try {
        // Call the API to get the user address
        const response = await fetch(`https://virtual-gf-py.vercel.app/user/get_username_by_address?user_wallet_address=${userid}`);
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch the address from the server.');
        }

        const data = await response.json();

        if (data.username) {
          const address = data.username;
          console.log("add", address);
          window.location.href = `https://starkshoot.fun/multiplayer.html?username=${address}&address=${userid}`;
          console.log(`https://starkshoot.fun/multiplayer.html?username=${address}&address=${userid}`);
        } else {
          alert('Address not found for the given user ID.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching the address.');
      }
    } else {
      // Handle the case where `userid` is not found
      alert('User ID not found in localStorage.');
      navigate('/'); // Redirect to another route if needed
    }
  };
  const handleRedirectDress = async () => {
    const userid = localStorage.getItem('userid');

    if (userid) {
      try {
        window.location.href = `https://starkshoot.fun/dressup.html?address=${userid}`
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching the address.');
      }
    } else {
      alert('User ID not found in localStorage.');
      navigate('/');
    }
  };


  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setRoomID(null);
    setBuildMode(false);
    setShopMode(false);
  };
  useEffect(() => {
    setPasswordCorrectForRoom(false); // PS: this is an ugly shortcut
  }, [roomID]);

  const ref = useRef();
  const [chatMessage, setChatMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const sendChatMessage = async () => {
    if (chatMessage.length > 0) {
        console.log("cm", chatMessage);
        setLoading(true); // Start loading when the request is sent
        try {
            // Send the message to the API and get the response
            const response = await fetch("https://virtual-gf-py.vercel.app/ai/ai-chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: chatMessage }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data", data);
                
                // Emit the response received from the API to the socket
                socket.emit("chatMessage", data.reply_content + " B:" + data.behavior  + ", E:" + data.emotion);

                // Clear the chat message input
                setChatMessage("");
            } else {
                console.error("Failed to send message to API. Status:", response.status);
            }
        } catch (error) {
            console.error("Error while sending message to API:", error);
        } finally {
            setLoading(false); // Stop loading when the request completes
        }
    }
};

  const playerId = localStorage.getItem('userid');

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch(`https://starkshoot.fun:2053/api/get-avatar/${playerId}`);

        if (!response.ok) {
          console.error("Error: No model found for this player ID.");
          return;
        }

        const data = await response.json();
        const modelUrl = data.model_url;
        setAvatarUrl(modelUrl); // Update the atom with the fetched URL
      } catch (error) {
        console.error("Error fetching avatar model:", error);
      }
    };

    if (playerId) {
      fetchAvatar();
    }
  }, [playerId, setAvatarUrl]);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >

        {avatarMode && (
          <AvatarCreator
            subdomain="wawa-sensei-tutorial"
            className="fixed top-0 left-0 z-[999999999] w-full h-full" // have to put a crazy z-index to be on top of HTML generated by Drei
            onAvatarExported={(event) => {
              let newAvatarUrl =
                event.data.url === avatarUrl.split("?")[0]
                  ? event.data.url.split("?")[0] + "?" + new Date().getTime()
                  : event.data.url;
              newAvatarUrl +=
                (newAvatarUrl.includes("?") ? "&" : "?") +
                "meshlod=1&quality=medium";
              setAvatarUrl(newAvatarUrl);
              localStorage.setItem("avatarURL", newAvatarUrl);
              if (roomID) {
                socket.emit("characterAvatarUpdate", newAvatarUrl);
              }
              setAvatarMode(false);
            }}
          />
        )}
        {passwordMode && (
          <PasswordInput
            onClose={() => setPasswordMode(false)}
            onSuccess={() => {
              setBuildMode(true);
              setPasswordCorrectForRoom(true);
            }}
          />
        )}
        {/* <div className="fixed inset-0 flex m-0 w-fit gap-8 py-[15%]  justify-items-start flex-col pointer-events-none select-none ">
          <button className="bg-[#D9D9D9] px-3  text-lg font-semibold py-2 text-center">
            SHOP
          </button>
         
            <button className="bg-[#D9D9D9] px-3  text-lg font-semibold py-2 text-center cursor-pointer">
              MARKET PLACE
            </button>
          
          <button className="bg-[#D9D9D9] px-3  text-lg font-semibold py-2 text-center">
            SETTINGS
          </button>
          <button className="bg-[#D9D9D9] px-3  text-lg font-semibold py-2 text-center">
            EXIT
          </button>
        </div> */}
        {/* <div className="fixed inset-x-0 inset-y-40 pl-[73%] w-full flex   gap-3  justify-end flex-col pointer-events-none select-none ">
          <div className="relative w-fit">
            <img src={desc} alt="" className="h-[83px] w-[133px]" />
            <p className="absolute text-base font-semibold  top-0 right-2">
              COIN
            </p>
          </div>
          <div className="relative w-fit">
            <img src={desc} alt="" className="h-[83px] w-[133px]" />
            <p className="absolute text-base font-semibold  top-0 right-2">
              NAME
            </p>
          </div>
          <div className="relative w-fit">
            <img src={desc} alt="" className="h-[83px] w-[133px]" />
            <p className="absolute text-base font-semibold  top-0 right-2">
              POINTS
            </p>
          </div>
        </div> */}

        <div>
          <div className="fixed inset-4  pointer-events-none select-none">
            <div className="flex gap-10 justify-end">
              <div className="flex items-center space-x-2 relative">
                <div className="relative w-52 h-6 bg-gray-200 rounded-md overflow-hidden">
                  {/* <div
                    className="absolute top-0 right-0 h-full bg-yellow-400"
                    style={{ width: `${(40 / 100) * 100}%` }}
                  ></div> */}
                  <div className="absolute inset-0 flex justify-center items-center bg-yellow-400 text-black font-bold">
                    40
                  </div>
                </div>

                <div
                  className="absolute"
                  style={{
                    right: "-1px",
                    top: "-6px",   
                  }}
                >
                  <img src={Goldcoin} className="h-8 w-8" alt="Gold Coin" />
                </div>
              </div>
              <div className="flex items-center space-x-2 relative">
                <div className="relative w-52 h-6 bg-gray-200 rounded-md overflow-hidden">
                  {/* <div
                    className="absolute top-0 right-0 h-full bg-blue-400"
                    style={{ width: `${(40 / 100) * 100}%` }}
                  ></div> */}
                  <div className="absolute inset-0 flex justify-center items-center  bg-blue-400 text-black font-bold">
                    40
                  </div>
                </div>

                <div
                  className="absolute"
                  style={{
                    right: "-1px", 
                    top: "-6px",   
                  }}
                >
                  <img src={Diamond} className="h-8 w-10" alt="Gold Coin" />
                </div>
              </div>
              <div className="flex items-center space-x-2 relative">
                <div className="relative w-52 h-6 bg-gray-200 rounded-md overflow-hidden">

                  <div className="absolute inset-0 flex justify-center items-center bg-slate-400 text-black font-bold">
                  0xa23....CE8
                  </div>
                </div>

                <div
                  className="absolute"
                  style={{
                    right: "-1px", 
                    top: "-6px",  
                  }}
                >
                  <img src={eth} className="h-8 w-5" alt="Gold Coin" />
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-4 flex items-center justify-end flex-col pointer-events-none select-none">
            {roomID && !shopMode && !buildMode && (
              <div className="pointer-events-auto p-4 flex items-center space-x-4">
              <input
                type="text"
                className="w-56 border px-5 p-4 h-full rounded-full"
                placeholder="Message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendChatMessage();
                  }
                }}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              
              <button
                className={`p-4 rounded-full drop-shadow-md cursor-pointer transition-colors flex items-center justify-center ${
                  loading ? "bg-slate-400 cursor-not-allowed" : "bg-slate-500 hover:bg-slate-800 text-white"
                }`}
                onClick={sendChatMessage}
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  // Loader animation (Spinner SVG)
                  <svg
                    className="animate-spin h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  // Send Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                )}
              </button>
            </div>
            
            )}
            <div className="flex items-center space-x-4 pointer-events-auto">
              {roomID && !shopMode && !buildMode && (
                <button
                  className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
                  onClick={leaveRoom}
                >
                  LOBBY
                </button>
              )}
              {/* BACK */}
              {(buildMode || shopMode) && draggedItem === null && (
                <button
                  className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
                  onClick={() => {
                    shopMode ? setShopMode(false) : setBuildMode(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                    />
                  </svg>
                </button>
              )}

              {/* AVATAR */}
              {!buildMode && !shopMode && (
                <div className="flex relative ">
                  <button
                    className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
                    onClick={handleRedirectDress}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </button>
                  <div className="flex justify-between px-5 items-center">
                    <button
                      style={{ padding: "13px 25px" }}
                      className="py-2 px-4 h-fit rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
                      onClick={handleRedirect}
                    >
                      Let's Build ✨
                    </button>
                  </div>
                </div>
              )}
              {/* BOT */}
              {!buildMode && !shopMode && (
                <button className="p-4 absolute -right-0 mr-1   rounded-full bg-slate-500 text-white drop-shadow-md  cursor-pointer hover:bg-slate-800 transition-colors">
                  <Link to="/bot">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2.25a.75.75 0 01.75.75v1.5h3a.75.75 0 010 1.5h-6a.75.75 0 010-1.5h3V3A.75.75 0 0112 2.25zM7.5 5.25h9A4.5 4.5 0 0121 9.75v6A4.5 4.5 0 0116.5 20.25h-9A4.5 4.5 0 013 15.75v-6A4.5 4.5 0 017.5 5.25zM8.25 12a.75.75 0 100 1.5h1.5a.75.75 0 000-1.5H8.25zM14.25 12a.75.75 0 100 1.5h1.5a.75.75 0 000-1.5h-1.5zM12 15a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 15a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                      />
                    </svg>
                  </Link>
                </button>
              )}
              {/* DANCE */}
              {roomID && !buildMode && !shopMode && (
                <button
                  className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
                  onClick={() => socket.emit("dance")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                    />
                  </svg>
                </button>
              )}
              {/* BUILD */}
              {roomID && !buildMode && !shopMode && (
                <button
                  className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
                  onClick={() => {
                    if (!passwordCorrectForRoom) {
                      setPasswordMode(true);
                    } else {
                      setBuildMode(true);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </button>
              )}
              {/* SHOP */}
              {buildMode && !shopMode && draggedItem === null && (
                <button
                  className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
                  onClick={() => setShopMode(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                    />
                  </svg>
                </button>
              )}

              {/* ROTATE */}
              {buildMode && !shopMode && draggedItem !== null && (
                <button
                  className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
                  onClick={() =>
                    setDraggedItemRotation(
                      draggedItemRotation === 3 ? 0 : draggedItemRotation + 1
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
              )}
              {/* CANCEL */}
              {buildMode && !shopMode && draggedItem !== null && (
                <button
                  className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
                  onClick={() => setDraggedItem(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              {/* REMOVE ITEM */}
              {buildMode && !shopMode && draggedItem !== null && (
                <button
                  className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
                  onClick={() => {
                    setRoomItems((prev) => {
                      const newItems = [...prev];
                      newItems.splice(draggedItem, 1);
                      return newItems;
                    });
                    setDraggedItem(null);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
