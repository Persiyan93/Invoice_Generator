import { useState, useEffect } from 'react'
import { IconButton, Paper, TableCell, TableRow, TableBody } from '@material-ui/core/';
import BlockIcon from '@material-ui/icons/Block';
import DoneIcon from '@material-ui/icons/Done';
import InfoIcon from '@material-ui/icons/Info';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import queryString from "query-string";
import useFetchGet from '../../../../hooks/useFetchGet'
import useFetchPut from '../../../../hooks/useFetchPut'
import apiEndpoints from '../../../../services/apiEndpoints'
import { userStatusFormater, currencyFormater } from '../../../../services/globalServices'
import TableWithServerSidePagingAndSorting from '../../../Elements/TableWithServerSidePagingAndSorting'
import ConfirmationPopup from '../../../Elements/ConfirmationPopup'
import Popup from '../../../Elements/Popup'
import UserSearchbar from './UserTableSearchBar'
import CreateUser from './AddUserInputForm';


const headCells = [

    { id: 'FullName', title: "Име на потребителя" },
    { id: 'Email', title: 'Емийл адрес' },
    { id: 'CountOfGeneratedInvoices', title: 'Генерираните фактури' },
    { id: 'SumOfAllInvoices', title: 'Стойност на Фактурите ' },
    { id: 'CountOfOverduedInvoices', title: 'Фактурите платени със забавяне' },
    { id: 'Status', title: 'Статус', disableSorting: 'true' },
    { id: 'Action', title: 'Действие', disableSorting: 'true' },

]
var date = new Date();
var initialPeriodOfStatisctic = {
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toJSON().slice(0, 10),
    endDate: date.toJSON().slice(0, 10)
}

export default function UsersTable(props) {
    const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
    const [paging, setPaging] = useState({ page: 0, rowsPerPage: 10 })
    const [filterString, setFilterString] = useState('')
    const [pagingAndSorting, setPagingAndSorting] = useState({ order: 'asc', orderBy: '' })
    const [periodOfStatistic, setPeriodOfStatistic] = useState(initialPeriodOfStatisctic)
    const [selectedUserId, selectUserId] = useState('');
    const [newUserStatus, setNewUserStatus] = useState('');
    const [users, setUsers] = useState([])


    //States related with userInfo
    const [clientInfoPopup, setClientInfoPopup] = useState(false)


    //Get Users
    var getUsersUrl = apiEndpoints.users + props.history.location.search;
    const [usersGetTriger, setUsersGetTriger] = useState(false)
    useFetchGet(getUsersUrl, setUsers, usersGetTriger, setUsersGetTriger)

    //Update user status
    var changeUserStatusURL = apiEndpoints.users + `/test`
    const [changeUserStatusTriger, setChangeUserStatusTriger] = useState(false);
    useFetchPut(changeUserStatusURL, changeUserStatusTriger, setChangeUserStatusTriger, { status: newUserStatus, userId: selectedUserId }, actionAfterSuccessfullyDisabledUser)

    const { orderBy, order } = pagingAndSorting;
    const { startDate, endDate } = periodOfStatistic;
    const { page, rowsPerPage } = paging;
    useEffect(() => {
        props.history.replace({
            search: `?${queryString.stringify({
                page: page == 0 ? undefined : page,
                rowsPerPage: rowsPerPage === 10 ? undefined : rowsPerPage,
                order: order,
                orderBy: orderBy ? orderBy : undefined,
                startDate: startDate,
                endDate: endDate,
                filterString: filterString ? filterString : undefined

            })}`
        })
        setUsersGetTriger(true)
    }, [order, orderBy, startDate, endDate, page, rowsPerPage, filterString])




    function disableUserHandler(event, userId) {
        setNewUserStatus('Blocked')
        selectUserId(userId)
        setOpenConfirmationPopup(true)
    }

    function activateUsersHandler(event, userId) {
        setNewUserStatus('Active')
        selectUserId(userId)
        setChangeUserStatusTriger(true)
        setChangeUserStatusTriger(true)
    }

    function actionAfterSuccessfullyDisabledUser() {
        setUsersGetTriger(true)
    }

    function getUserInfoHandler(e, clientId) {
        selectUserId(clientId)
        setClientInfoPopup(true)
    }

    function actionAfterSuccessFullyUpdatedUserAccess() {
        setClientInfoPopup(false)
    }


    return (
        <>
            <UserSearchbar
                filterString={filterString}
                setFilterString={setFilterString}
                periodOfStatistic={periodOfStatistic}
                setPeriodOfStatistic={setPeriodOfStatistic}
                setUsersGetTriger={setUsersGetTriger}>
            </UserSearchbar>

            <TableWithServerSidePagingAndSorting
                pagingAndSorting={pagingAndSorting}
                setPagingAndSorting={setPagingAndSorting}
                headCells={headCells}
                isLoading={false}
                tableContainer={Paper}
            >

                <TableBody>

                    {

                        users.map((user) => (

                            <TableRow key={user.id}   >
                                <TableCell component="th" scope="row" >
                                    {user.fullName}
                                </TableCell>
                                <TableCell align="right">{user.email} </TableCell>
                                <TableCell align="right">{user.countOfGeneratedInvoices}</TableCell>
                                <TableCell align="right">{currencyFormater(user.sumOfAllInvoices)}</TableCell>
                                <TableCell align="right">{user.countOfOverduedInvoices}</TableCell>
                                <TableCell align="right" style={{ color: user.status == 'Blocked' ? '#FF0000' : '#0AE209' }}>{userStatusFormater(user.status)}</TableCell>

                                <TableCell align="right">
                                    {
                                        user.status == 'Blocked' ?
                                            (
                                                <IconButton size="medium" onClick={(e) => { activateUsersHandler(e, user.id) }}  >
                                                    <DoneIcon fontSize="small" htmlColor='green' />
                                                </IconButton>
                                            )

                                            :
                                            (
                                                <IconButton size="medium" onClick={(e) => { disableUserHandler(e, user.id) }}  >
                                                    < BlockIcon fontSize="small" htmlColor='red' />
                                                </IconButton>
                                            )

                                    }


                                    <IconButton size="medium" onClick={(e) => getUserInfoHandler(e, user.id)}>
                                        <InfoIcon fontSize="small" htmlColor='black' />
                                    </IconButton>


                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>



            </TableWithServerSidePagingAndSorting>

            <ConfirmationPopup
                setOpenPopup={setOpenConfirmationPopup}
                actionAfterConfirmation={() => { setChangeUserStatusTriger(true) }}
                openPopup={openConfirmationPopup}
                title='Ограничаване на достъпа'
                question={`Сигурни ли сте че искате да ограничите достъпа на ${users.find(x => x.id == selectedUserId)?.fullName} `}
            />


            <Popup
                setOpenPopup={setClientInfoPopup}
                openPopup={clientInfoPopup}
                title='Информация за служителя'
                width='xl'
                icon={<PermIdentityIcon color="default" size="large" />}
            >
                <CreateUser
                    userId={selectedUserId}
                    disableTextField={true}
                    actionAfterSuccessFullyUpdatedUserAccess={actionAfterSuccessFullyUpdatedUserAccess}
                    disable={true}
                />
            </Popup>
        </>
    )
}

