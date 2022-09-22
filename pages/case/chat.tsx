import {useCallback, useEffect, useRef, useState} from "react";
import {Button} from "primereact/button";
import {faPaperclip, faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {InputText} from "primereact/inputtext";
import {useRouter} from "next/router";
import axios from "axios";
import SockJsClient from 'react-stomp';
import {random} from "nanoid";
import {SelectButton} from "primereact/selectbutton";
import {Dropdown} from "primereact/dropdown";

export const Chat = ({user}: any) => {
    const router = useRouter();
    const {id} = router.query;

    const messageWrapper = useRef(null);
    const fileUploadInput = useRef(null);

    const [currentUser, setCurrentUser] = useState({
        username: 'agent1',
        firstName: 'First name',
        lastName: 'Last name'
    });

    const [currentCustomer, setCurrentCustomer] = useState({
        username: 'customer1',
        firstName: 'John',
        lastName: 'Doe'
    });

    const [currentCompany, setCurrentCompany] = useState({
        name: 'Google'
    });

    const [currentChannel, setCurrentChannel] = useState('CHAT');
    const [currentText, setCurrentText] = useState('');
    const [attachmentButtonHidden, setAttachmentButtonHidden] = useState(false);
    const [sendButtonDisabled, setSendButtonDisabled] = useState(false);
    const [messageList, setMessageList] = useState([] as any);
    const [messages, setMessages] = useState([] as any);

    useEffect(() => {
        if (id) {
            axios.get(`${process.env.NEXT_PUBLIC_BE_PATH}/case/${id}/item`)
                .then(res => {
                    setMessageList(res.data);
                });
            axios.get(`${process.env.NEXT_PUBLIC_BE_PATH}/case/${id}`)
                .then(res => {
                    setCurrentCustomer({username: res.data.userName, firstName: "John", lastName: "doe"});
                });
        }
    }, [id]);

    useEffect(() => {
        setMessages(messageList.map((msg: any) => {
            return (<div key={msg.id} style={{
                display: 'block',
                width: 'auto',
                maxWidth: '100%',
                wordBreak: 'break-all',
                padding: '10px',
                margin: '0px 5px'
            }}>
                {msg.direction === 'INBOUND' &&
                    <div style={{textAlign: 'left'}}>
                        <div style={{
                            fontSize: '10px',
                            marginBottom: '10px'
                        }}>{currentCustomer.username}&nbsp;-&nbsp;{msg.channel}</div>
                        <span style={{background: '#bbbbbb', lineHeight: '27px', borderRadius: '3px', padding: '7px 10px'}}>
                    <span style={{}}>{msg.message}</span><span style={{marginLeft: '10px'}}>22:13</span>
                    </span>
                    </div>
                }
                {msg.direction === 'OUTBOUND' &&
                    <div style={{textAlign: 'right'}}>
                        <div style={{
                            fontSize: '10px',
                            lineHeight: '16px',
                            marginBottom: '10px'
                        }}>{currentUser.firstName}&nbsp;{currentUser.lastName}</div>
                        <span style={{background: '#bbbbbb', lineHeight: '27px', borderRadius: '3px', padding: '7px 10px'}}>
                            <span style={{}}>{msg.message}</span><span style={{marginLeft: '10px'}}>22:13</span>
                        </span>
                    </div>
                }

            </div>);
        }));
    }, [messageList]);

    //when a new message appears, scroll to the end of container
    useEffect(() => {
        messageWrapper?.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    //when the user types, we hide the buttons
    useEffect(() => {
        setAttachmentButtonHidden(currentText !== '')
        setSendButtonDisabled(currentText === '')
    }, [currentText]);

    const handleAttach = () => {

    };

    const handleSendMessage = () => {
        axios.post(`${process.env.NEXT_PUBLIC_BE_PATH}/case/${id}/item`, {
            source: 'WEB',
            direction: 'OUTBOUND',
            channel: currentChannel,
            userName: currentCustomer.username,
            message: currentText
        })
            .then(res => {
                setMessageList((messageList: any) => [...messageList, res.data]);
                setCurrentText('');
            });
    };

    const getTypingIndicator = useCallback(
        () => {
            return undefined;
        }, [],
    );

    const handleWebsocketMessage = function (msg: any) {
        setMessageList((messageList: any) => [...messageList, {
            id: msg.id,
            direction: msg.direction,
            message: msg.message
        }]);
    }

    function simulateMessage() {
        axios.post(`${process.env.NEXT_PUBLIC_WEBSOCKET_PATH}/case/${id}/simulateMessage`, {
            source: 'WEB',
            direction: 'OUTBOUND',
            message: random(10) + ""
        });
    }

    return (
        <>
            <div style={{width: '100%', height: '100%'}}>

                <SockJsClient
                    url={`${process.env.NEXT_PUBLIC_WEBSOCKET_PATH}/websocket`}
                    topics={[`/queue/new-case-item/${id}`]}
                    onConnect={console.log("Connected! - " + id)}
                    onDisconnect={console.log("Disconnected!")}
                    onMessage={(msg: any) => handleWebsocketMessage(msg)}
                    debug={true}
                />

                <div style={{
                    width: '100%',
                    height: 'calc(100% - 100px)',
                    overflowX: 'hidden',
                    overflowY: 'auto'
                }}>
                    {messages}
                    <div ref={messageWrapper}></div>
                </div>
                <div style={{width: '100%', height: '100px'}}>

                    <InputText style={{width: 'calc(100% - 150px)'}} value={currentText}
                               onChange={(e) => setCurrentText(e.target.value)}/>

                    <Dropdown optionLabel="label" value={currentChannel} options={[
                        {
                            label: 'Web chat',
                            value: 'CHAT'
                        },
                        {
                            label: 'Email',
                            value: 'EMAIL'
                        },

                    ]} onChange={(e) => setCurrentChannel(e.value)}/>

                    <Button disabled={sendButtonDisabled} onClick={() => handleSendMessage()} className='p-button-text'>
                        <FontAwesomeIcon icon={faPlay} style={{color: 'black'}}/>
                    </Button>

                    {
                        !attachmentButtonHidden &&
                        <>
                            <Button onClick={() => fileUploadInput?.current.click()} className='p-button-text'>
                                <FontAwesomeIcon icon={faPaperclip} style={{color: 'black'}}/>
                            </Button>
                            <input ref={fileUploadInput} type="file" name="file" style={{display: 'none'}}/>
                        </>
                    }

                </div>

            </div>
        </>
    );

}