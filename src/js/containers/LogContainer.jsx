import { connect } from "react-redux";

import Log from "../views/Log";

const mapStateToProps = ({ log }) => ({ log });

const LogContainer = connect(mapStateToProps)(Log);

export default LogContainer;
