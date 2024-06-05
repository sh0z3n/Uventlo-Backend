import ApiVideoClient from '@api.video/nodejs-client';
import dotenv from 'dotenv'
dotenv.config({ path: './Api/config/env/.env' });

        const client = new ApiVideoClient({ apiKey:process.env.LiveStreamKey });

        async function createLiveStream(name, isPublic) {

        const liveStreamCreationPayload = {
			name: name, 
			_public: isPublic, // Whether your video can be viewed by everyone, or requires authentication to see it. A setting of false will require a unique token for each view.
			playerId: "pl4f4ferf5erfr5zed4fsdd", // The unique identifier for the player.
		}; 

        return await client.liveStreams.create(liveStreamCreationPayload);
    };

    async function deleteLiveStream(liveStreamId) {
        return await client.liveStreams.delete(liveStreamId);
    };

    async function getLiveStream(liveStreamId) {
        return await client.liveStreams.get(liveStreamId);
    };

    async function listLiveStreams() {
        return await client.liveStreams.list();
    };


    export default { createLiveStream, deleteLiveStream, getLiveStream, listLiveStreams };