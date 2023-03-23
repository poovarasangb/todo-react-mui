import {
    BallotOutlined, PendingActionsRounded, FactCheckOutlined
} from "@mui/icons-material";
import DeleteAction from "./component/deleteAction";

const todoFetchURL = "http://localhost:2020/todo";

const menuList = [
    {
        name: "All",
        type: "all",
        id: 0,
        iconClass: <BallotOutlined />
    }, {
        name: "Pending",
        type: "pending",
        id: 1,
        iconClass: <PendingActionsRounded />
    }, {
        name: "Completed",
        type: "completed",
        id: 2,
        iconClass: <FactCheckOutlined />
    }
];

const todoHeader = [{
    id: "index",
    field: "index",
    headerName: "#",
    headerAlign: "left",
    width: 20

}, {
    id: "name",
    field: "name",
    headerName: "Task Name",
    headerAlign: "Center",
    width: 400,
    editable: true
}, {
    id: "dueDate",
    field: "dueDate",
    headerName: "Due Date",
    headerAlign: "Center",
    width: 100
}, {
    id: "delete",
    field: "Delete",
    headerClassName: "hideHeader",
    renderCell: (cellValues) => (
        <DeleteAction
            deleted={cellValues}
            todoFetchURL={todoFetchURL}
        />
    )
}];

const differenceBet2Arrays = (arr1, arr2) => {
    let difference = [];
    if (arr1.length > arr2.length){
        difference = [...arr1].filter(x => !arr2.includes(x));
    }
    if (arr1.length <= arr2.length){
        difference = [...arr2].filter(x => !arr1.includes(x));
    }
    return difference;
};

export { menuList, todoFetchURL, todoHeader, differenceBet2Arrays };