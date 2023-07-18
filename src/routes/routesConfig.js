import React, {useContext} from "react";

import Routes from "./routes";
import RoutesDrawer from "./routesDrawer";

import { User } from "../contexts/User";

function RoutesConfigs() {
    let { signIn } = useContext(User);

    return signIn ? <RoutesDrawer /> : <Routes />;
}

export default RoutesConfigs;