import { useState, useEffect } from "react";
import "./style.css";
import useFetchPut from "../../../hooks/useFetchPut";
import apiEndpoints from "../../../services/apiEndpoints";
import { IconButton, Badge, Grid, Toolbar, makeStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';


export default function Notification(props) {
  const { isNotificationsOpen, setNotificationsOpen, notifications, setNotifications } = props;


  const [selectedNotificationId, selectNotificationId] = useState();

  const [updateNotificationStatusTriger, setUpdateNotificationStatusTriger] = useState('false');
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
            top: "55px"
          }}
          className={"notificationBar"}
        >
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: "14px", textAlign: "left", width: "93%" }}>
              Notifications
            </p>
            {/* <IconButton size='small'>
            <CloseIcon
              onClick={closeNotificationWindowHandler}
              style={{ width: "5%", cursor: "pointer" }}
            ></CloseIcon>
          </IconButton> */}
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
                  display: "initial"
                }}
              >
                <span style={{ display: "inline-block", width: "50%", color: "black" }}>
                  {'23 apr'}
                </span>

              </p>



              <div
                style={{ background: "#fff", padding: "5px" }}
                className={"lineItmes"}
              >
                <span
                  style={{ fontSize: "13px", fontWeight: 700 }}
                >{notification.type}</span>

                <CloseIcon

                  onClick={(e) => markNotificationAsReaded(e, notification.id)}
                  style={{ width: "5%", cursor: "pointer", float: "right" }}
                  htmlColor='black'
                  size="small"


                ></CloseIcon>
                <div style={{ fontSize: "10px" }}>{notification.message}</div>
              </div>

            </div>

          ))}










          <p style={{ textAlign: "right", margin: 0, color: "#42A5F5" }}>
            VIEW ALL
          </p>
        </div>
      )}
    </div>
  );

}

