import React, { Component } from "react";

import ChannelList from "../components/channellist";
import Channel from "../components/channel";

class ChannelControl extends Component {

  constructor() {
    super();
    this.state = {
      channelMap: new Map(),
      channels: [],
    };
  }

  componentDidMount() {

    this.addChannel({
      id: 0,
      color: "FF0000",
      range: [0, 0.1]
    },  () => {
      this.addChannel({
        id: 1,
        color: "0000FF",
        range: [0, 1]
      })
   ; });

  }

  addChannel(channel, callback=()=>{}) {
    const {id} = channel;
    const {channels, channelMap} = this.state;

    var newChannelMap = new Map(channelMap);
    newChannelMap.set(id, channel);

    this.setState({
      channelMap: newChannelMap,
      channels: channels.concat([id])
    }, callback)
  }

  updateChannelRange(id, range_percent) {
    const {channelMap} = this.state;
    
    // input validation
    const range = range_percent.map(v => {
      return v / 100;
    });
    if (!(0 <= range[0] < range[1] <= 1)) {
      return;
    }

    var newChannelMap = new Map(channelMap);
    newChannelMap.get(id).range = range

    this.setState({
      ChannelMap: newChannelMap
    })

  }

  render() {
    const {channels, channelMap} = this.state;
    return (
      <div className="ChannelControl">
        <ChannelList>
          {channels.map(id => {
            const channel = channelMap.get(id);
            const {color, range} = channel;
            return (
              <Channel key={id} channel={channel}
               onRangeChange={this.updateChannelRange.bind(this, id)}/>
            );
          })}
        </ChannelList>
      </div>
    );
  }
}

export default ChannelControl;
