import { useState, useEffect } from "react";
import { createHTChatMessengerContract } from "../../Constants/contractUtils";
import EnsAvatar from "../EnsAvatar";
import { HourglassBottom, Send } from "@mui/icons-material";
import { Card, CardActionArea, CardContent } from "@mui/material";

export default ({ sender, receiver }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatList, setChatList] = useState([]);

  const [sending, setSending] = useState(false);
  const [receiver2, setReceiver2] = useState("");

  useEffect(() => {
    const init = async () => {
      if (!receiver) {
        const contract = await createHTChatMessengerContract();
        const AccountAddress = localStorage.getItem("AccountAddress");
        const fetchedChatList = await contract.getChatsForUser(AccountAddress);
        console.log(fetchedChatList);
        setChatList(fetchedChatList);
      } else {
        getChatHistory();
      }
    };

    init();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const AccountAddress = localStorage.getItem("AccountAddress");
      console.log(AccountAddress);
      console.log(sender);
      console.log(receiver);
      console.log(receiver2);
      const contract = await createHTChatMessengerContract();
      const tx = await contract.sendMessage(
        sender ? sender : AccountAddress,
        receiver ? receiver : receiver2,
        message
      );
      await tx.wait();
      setMessage("");
      setSending(false);
      getChatHistory();
    } catch (error) {
      console.error("Error sending message:", error);
      if (error.message.toLowerCase().includes("message to yourself")) {
        alert("You cannot send a message to yourself!");
      }
    } finally {
      setSending(false);
    }
  };

  const getChatHistory = async (rece = receiver) => {
    try {
      const contract = await createHTChatMessengerContract();

      const AccountAddress = localStorage.getItem("AccountAddress");
      const history = await contract.getChatHistory(
        sender ? sender : AccountAddress,
        rece ? rece : receiver2
      );
      setChatHistory(history);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleChatSelection = async (receiver) => {
    setReceiver2(receiver);
    getChatHistory(receiver);
  };
  return (
    <div className="App h-screen">
      <div className="flex flex-row">
        <div>
          {!receiver && (
            <div>
              <h6>Chat List</h6>
              {chatList.map((chatId) => (
                <div className="flex flex-row" key={chatId}>
                  <Card className="m-1">
                    <CardActionArea onClick={() => handleChatSelection(chatId)}>
                      <CardContent className="flex flex-row gap-2">
                        <EnsAvatar address={chatId} size={30} />
                        {chatId.slice(0, 6) + "..." + chatId.slice(38, 42)}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h4>Chat Messenger</h4>

          <header>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center">
                <EnsAvatar
                  address={receiver ? receiver : receiver2}
                  size={30}
                />
                {receiver ? receiver : receiver2}
              </div>
            </div>
          </header>
          <section>
            <main>
              {chatHistory &&
                chatHistory.map((msg, index) => (
                  <ChatMessage key={index} message={msg} />
                ))}
            </main>

            <form onSubmit={sendMessage}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
              />
              <button type="submit" disabled={!message}>
                {sending ? <HourglassBottom /> : <Send />}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

function ChatMessage({ message }) {
  const { content, sender, receiver } = message;
  const AccountAddress = localStorage.getItem("AccountAddress");
  const messageClass =
    sender.toLowerCase() === AccountAddress.toLowerCase() ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <p>{content}</p>
    </div>
  );
}
