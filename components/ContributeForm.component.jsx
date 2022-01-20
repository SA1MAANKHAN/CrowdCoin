import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

import React, { useState } from 'react';

function ContributeForm({address}) {

  const [value, setvalue] =  useState("");
  const [errorMessage, seterrorMessage] =  useState("");
  const [loading, setloading] =  useState(false);

  const handleSubmit =  async (event) => {
      event.preventDefault();

      const campaign = Campaign(address);

      setloading(true);
      seterrorMessage("");

      try {
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.contribute().send({
          from: accounts[0],
          value: web3.utils.toWei(value, 'ether')
        });

        Router.replaceRoute(`/campaigns/${address}`);

      } catch (err) {
        seterrorMessage(err.message)
      }

      setloading(false);
      setvalue("");
    }


   return (
      <Form onSubmit={handleSubmit} error={!!errorMessage}>
         <Form.Field>
           <label>Amount to Contribute</label>
           <Input
            value={value}
            onChange={event => setvalue(event.target.value)}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>

         <Message error header="Oops!" content={errorMessage} />
       <Button primary loading={loading}>
           Contribute!
         </Button>
      </Form>
    );
}

export default ContributeForm;