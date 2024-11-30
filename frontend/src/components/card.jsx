import React from 'react'
import styled from 'styled-components';
import FullButton from './Buttons/FullButton';

const ShortCard = (props) => {
  return (
    <div key={props.id} className="col-md-4 mb-3 w-1/3">
        <div className="h-full">
            <div className="flex card-body flex-col justify-between h-full">
                <h3 className="card-title text-xl"><strong>{props.title}</strong></h3>
                <p className="card-text"><strong>Description:</strong> {props.description}</p>
                <p className="card-text"><strong>Unit:</strong> {props.unit}</p>
                <p className="card-text"><strong>Status:</strong> {props.status}</p>
                <p className="card-text"><strong>Instructor:</strong> {props.instructor}</p>
                <BtnWrapper>
                  <FullButton title={props.buttonName} action={props.action} border/>
                </BtnWrapper>
            </div>
        </div>
    </div>
  )
}
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
export default ShortCard;