import React from "react";

import { Col, Row } from "reactstrap";

class Log extends React.Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.gameLog.scrollTop =
      this.gameLog.scrollHeight - this.gameLog.clientHeight;
  }

  render() {
    const messages = this.props.log.map(m => <li key={m}>{m}</li>);
    return (
      <Row>
        <Col>
          <div>
            <h2>Log</h2>
            <ul className="game-log" ref={e => (this.gameLog = e)}>
              {messages}
            </ul>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Log;
