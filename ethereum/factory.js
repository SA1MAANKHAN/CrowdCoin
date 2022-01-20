import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json"

const address = "0xb548D9524830D59Ca736DD66F373bbcFf2DDaD63"
const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), address )

export default instance;