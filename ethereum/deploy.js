const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const dotenv = require("dotenv")
dotenv.config();

const provider = new HDWalletProvider(
 `${process.env.MY_MNUEMONIC}`,
  'https://rinkeby.infura.io/v3/c567cc0b63d942309a7d0b3d294bde01'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();

