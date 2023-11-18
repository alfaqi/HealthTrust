import { Broadcast } from "@livepeer/react";

export default ({ streamKey }) => {
  return (
    <div className="container">
      <Broadcast
        streamKey={streamKey}
        controls={{ autohide: 0, hotkeys: false, defaultVolume: 0.6 }}
        showPipButton
      />
    </div>
  );
};
