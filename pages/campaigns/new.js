import React, { useState } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout.component'
import factory from "../../ethereum/factory"
import web3 from '../../ethereum/web3';
import { Router } from "../../routes"

function CampaignNew() {

    const [minContri, setminContri] = useState(0);
    const [errMessage, seterrMessage] = useState("")
    const [loading, setloading] = useState(false)
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        seterrMessage("");
        setloading(true);
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(minContri)
            .send({
                from: accounts[0]
            });

            Router.pushRoute("/");
        }catch(err){
            seterrMessage(err.message)
        }
        setloading(false)
    }

    return (
        <Layout>
            <h1>New Campaign</h1>
            <Form onSubmit={handleSubmit} error={!!errMessage}>
                        <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                    type='number'
                    label="wei"
                    labelPosition="right"
                    value={minContri}
                    onChange={event =>
                        setminContri(event.target.value)}
                    />
                </Form.Field>
                <Message error negative>
                <Message.Header>Oops! Something went wrong</Message.Header>
                <p>{errMessage}</p>
                </Message>
                 <Button loading={loading} primary>
                    Create!
                </Button>
            </Form>
           
        </Layout>
    )
}

export default CampaignNew
