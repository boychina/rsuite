import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import ModalHeader from '../src/ModalHeader';
import innerText from './innerText';

describe('ModalHeader', () => {

  it('Should render a modal header', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalHeader>{title}</ModalHeader>
    );
    assert.equal(findDOMNode(instance).className, 'modal-header');
    assert.equal(innerText(findDOMNode(instance)), '×Test');
  });

  it('Should hide close button', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalHeader closeButton={false}>{title}</ModalHeader>
    );
    assert.ok(!findDOMNode(instance).querySelector('button'));
  });

  it('Should call onHide callback', (done) => {
    let doneOp = (event) => {
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalHeader onHide={doneOp} />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('button.close'));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalHeader className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalHeader style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
