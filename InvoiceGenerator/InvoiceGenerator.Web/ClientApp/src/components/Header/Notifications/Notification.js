import { useState } from "react";
import "./style.css";
import useFetchPut from "../../../hooks/useFetchPut";
import apiEndpoints from "../../../services/apiEndpoints";
import CloseIcon from '@material-ui/icons/Close';

const months = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
export default function Notification(props) {
    const { isNotificationsOpen, setNotificationsOpen, notifications, setNotifications } = props;


    const [selectedNotificationId, selectNotificationId] = useState();

    const [updateNotificationStatusTriger, setUpdateNotificationStatusTriger] = useState(false);
    let updateNotificationStatusUrl = apiEndpoints.updateNotificationStatus + `/${selectedNotificationId}`

    useFetchPut(updateNotificationStatusUrl, updateNotificationStatusTriger,
        setUpdateNotificationStatusTriger, undefined, actionAfterSuccessfullyUpdatedNotification)

    function closeNotificationWindowHandler() {

        setNotificationsOpen(false)
    }
    function actionAfterSuccessfullyUpdatedNotification() {
        setNotifications(prevState => ([...prevState.filter(x => x.id !== selectedNotificationId)]))
    }

    function markNotificationAsReaded(e, notificationId) {
        selectNotificationId(notificationId);
        setUpdateNotificationStatusTriger(true);

    }
    function convertMonthInRightFormat(date) {
        let [day, month] = date.split('.');
        let result = day + ' ' + months[month - 1];
        return result
    }







    return (
        <div className={"notification"} style={{ position: "relative" }}>

            {isNotificationsOpen && (
                <div
                    style={{
                        position: "absolute",
                        width: "400px",
                        border: "0.5px solid #8080803d",
                        minHeight: "100px",
                        overflowY: "auto",
                        top: "60px"
                    }}
                    className={"notificationBar"}
                >
                    <div style={{ display: "flex" }}>
                        <p style={{ fontSize: "20px", fontWeight: 550, textAlign: "left", width: "93%" }}>
                            Известия
            </p>

                        <CloseIcon onClick={(e) => closeNotificationWindowHandler(e, 'Test')}
                            style={{ width: "5%", cursor: "pointer" }}
                        ></CloseIcon>


                    </div>

                    {notifications.map((notification) => (

                        <div key={notification.id}>
                            <p
                                style={{
                                    fontSize: "10px",
                                    margin: "5px 0",
                                    textAlign: "left",
                                    color: "#747474",
                                    display: "initial",
                                    borderRadius: 10
                                }}
                            >
                                <span style={{ display: "inline-block", width: "50%", color: "black", fontSize: "13px" }}>
                                    {convertMonthInRightFormat(notification.date)}
                                </span>

                            </p>



                            <div
                                style={{ background: "#fff", padding: "5px" }}
                                className={"lineItmes"}
                            >
                                <span
                                    style={{ fontSize: "16px", fontWeight: 700 }}
                                >{notification.type}</span>

                                <CloseIcon

                                    onClick={(e) => markNotificationAsReaded(e, notification.id)}
                                    style={{ width: "5%", cursor: "pointer", float: "right" }}
                                    htmlColor='black'
                                    size="small"


                                ></CloseIcon>
                                <div style={{ fontSize: "15px" }}>{notification.message}</div>
                            </div>

                        </div>

                    ))}

                    <p style={{ textAlign: "right", margin: 0, color: "#42A5F5", cursor: 'pointer', fontWeight: 350 }}>
                        Изтрий  Всички
                     </p>
                </div>
            )}
        </div>
    );

}

