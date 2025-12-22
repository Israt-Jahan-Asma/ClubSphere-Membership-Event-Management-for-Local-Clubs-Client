import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import DashLayout from "../DashLayout/DashLayout";
import MainDashboard from "../Dashboard/MainDashboard/MainDashboard";
import CreateRequest from "../Dashboard/CreateRequest/CreateRequest";
import AllUsers from "../Dashboard/All Users/AllUsers";
import PrivateRoute from "../router/PrivetRouter";
import MyDonationRequests from "../Dashboard/MyDonationRequests/MyDonationRequests";
import Donate from "../Pages/Donate/Donate";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import SearchDonor from "../Pages/SearchDonor/SearchDonor";
import DonationRequestsPublic from "../Pages/DonationRequestsPublic/DonationRequestsPublic";
import RequestDetails from "../Pages/RequestDetails/RequestDetails";
import PrivetRouter from "../router/PrivetRouter";
import Profile from "../Dashboard/Profile/Profile";
import EditRequest from "../Dashboard/EditRequest/EditRequest";
import AllDonationRequests from "../Dashboard/AllDonationRequests/AllDonationRequests";
import Funding from "../Dashboard/Funding/Funding";
import NotFound from "../Pages/NotFoundPage/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout> </RootLayout>,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: '/login',
                Component: Login 
            },
            {
                path: '/register',
                Component: Register 
            },
            {
                path: '/donate',
                element: <PrivateRoute> <Donate> </Donate></PrivateRoute>  
            },
            {
                path: '/payment-success',
                Component: PaymentSuccess 
            },
            {
                path: '/search',
                Component: SearchDonor
            },
            {
                path: '/donation-requests',
                Component: DonationRequestsPublic
            },
            {
                path: '/request-details/:id',
                element: <PrivetRouter><RequestDetails> </RequestDetails></PrivetRouter>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashLayout> </DashLayout></PrivateRoute>,
        children:[
            {
            index: true,
            Component: MainDashboard

        },
        {
            path:'profile',
            Component: Profile
        },
        {
            path: 'create-donation-request',
            Component: CreateRequest
        },
        {
            path: 'all-users',
            Component: AllUsers
        },
        {
            path: 'my-donation-requests',
            Component: MyDonationRequests
        },
        {
            path: '/dashboard/edit-request/:id',
            Component: EditRequest
        },
        {
            path: 'all-blood-donation-request',
            Component: AllDonationRequests
        },
        {
            path: 'funding',
            Component: Funding
        }
        ]
    },
    {
        path: "*",
        Component: NotFound
    }
]);

export default router