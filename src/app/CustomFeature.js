import { IFeature } from '@vialabs-io/node-core/types/IFeature';
import { IDriverBase } from '@vialabs-io/node-core/types/IDriverBase';
import { IMessage } from '@vialabs-io/node-core/types/IMessage';

class CustomFeature implements IFeature {
    public featureId = 7000000; // This is normally the correct feature ID to use in a custom project.
    public featureName = 'CustomFeature';
    public featureDescription = 'A custom feature that does something special.';

    async process(driver: IDriverBase, message: IMessage): Promise<IMessage> {
        console.log('Processing feature:', this.featureName);
        // Custom logic here, pull information from external database, call an API
        // or do multiple cross chain transactions. Any arbitrary code can run here
        // and any arbitrary data can be passed back to the receiving contract:
        //
        // It is also possible to encode complex data structures, which are decoded
        // on chain and able to be used by the implementing contract:
        //
        // message.featureReply = ethers.utils.defaultAbiCoder.encode();
 
        return message;
    }

    async isMessageValid(driver: IDriverBase, message: IMessage): Promise<boolean> {
        // Optional extra validation logic here - for example, off-chain KYC check or linking to
        // an off-chain database record or authentication service. 
        return true;
    }
}
export default CustomFeature;