import React from "react";
import axios from "axios";
import { Form } from "semantic-ui-react";

export default class FindHome extends React.Component {
  state = { agents: [], agent: null, buyers: [], buyer: null };

  async componentDidMount() {
    const res = await axios.get("/api/agents");
    this.setState({ agents: res.data });
  }

  agentList = () => {
    const { agents } = this.state;
    return agents.map( agent =>{
      return {
        key: agent.id, 
        text: `${agent.first_name} ${agent.last_name}`, 
        value: agent.id, }
    })
  };

  buyerList= () => {
    const { buyers } = this.state;

    return buyers.map( buyer => {
      return{
        key: buyer.id,
        text: `${buyer.first_name} ${buyer.last_name}`,
        value: buyer.id
      }
    })
  }

  getBuyer = (e, { value }) => {
    this.setState( { agent: value }, () =>{
      axios.get(`/api/agents/${this.state.agent}`).then( res => {
        this.setState({ buyers: res.data})
      })
    })
  }

  render() {
    //options = [{key, text, value}, {key, text, value},]
    
    return (
      <>
        <br />
        <Form.Select 
          label='Agent ' 
          options={this.agentList()} 
          onChange={this.getBuyer}         
        />
        <br />

        {this.state.agent && <Form.Select label='Buyer ' options={this.buyerList()} />}
      </>
    )
  }
}
