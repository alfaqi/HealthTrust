import { Player } from "@livepeer/react";

export default ({ playbackId }) => {
  return (
    <div className="container">
      <Player
        playbackId={playbackId}
        loop
        showPipButton
        autoPlay={true}
        showTitle={false}
        muted={false}
      />
    </div>
  );
};
