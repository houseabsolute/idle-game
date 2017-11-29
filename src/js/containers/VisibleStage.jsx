import { connect } from "react-redux";

import Stages from "../views/Stages";

const mapStateToProps = state => state;

const VisibleStage = connect(mapStateToProps)(Stages);

export default VisibleStage;
