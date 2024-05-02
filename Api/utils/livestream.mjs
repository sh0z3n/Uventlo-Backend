import ApiVideoClient from '@api.video/nodejs-client';


        const client = new ApiVideoClient({ apiKey: "gdFGSjdMw8rZkb7jraEFmIpp99i9NOwo4j71v2ekfnk" });

        async function createLiveStream(name, isPublic) {

        const liveStreamCreationPayload = {
			name: name, // Add a name for your live stream here.
			_public: isPublic, // Whether your video can be viewed by everyone, or requires authentication to see it. A setting of false will require a unique token for each view.
			playerId: "pl4f4ferf5erfr5zed4fsdd", // The unique identifier for the player.
		}; 

        // LiveStream
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