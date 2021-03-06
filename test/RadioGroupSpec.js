import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import RadioGroup from '../src/RadioGroup';
import Radio from '../src/Radio';

describe('RadioGroup', () => {
  it('Should render a radio group', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup>
        <Radio>Test1</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );
    assert.equal(findDOMNode(instance).querySelectorAll('.radio').length, 2);
  });

  it('Should have a name in input', () => {
    const name = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup name={name}>
        <Radio>Test1</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );
    assert.equal(findDOMNode(instance).querySelectorAll('input[name="Test"]').length, 2);
  });

  it('Should have `radio-inline` className in radio', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup inline>
        <Radio>Test1</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );
    assert.equal(findDOMNode(instance).querySelectorAll('.radio-inline').length, 2);
  });

  it('Should output a h1', () => {

    let instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup inline>
        <h1>Group</h1>
        <Radio>Test1</Radio>
      </RadioGroup>
    );
    assert.ok(findDOMNode(instance).querySelectorAll('.h1'));
  });

  it('Should be checked when set value', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup value={2} >
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test2</Radio>
        <Radio value={4}>Test2</Radio>
      </RadioGroup>
    );
    const radios = findDOMNode(instance).querySelectorAll('.radio');
    assert.ok(radios[1].querySelector('.checked'));
  });

  it('Should be checked when set defaultValue', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup defaultValue={2} >
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test2</Radio>
        <Radio >Test2</Radio>
      </RadioGroup>
    );
    const radios = findDOMNode(instance).querySelectorAll('.radio');
    assert.ok(radios[1].querySelector('.checked'));
  });


  it('Should call onChange callback', (done) => {

    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup
        onChange={(value) => {
          if (value === 3) {
            done();
          }
        }}
      >
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test2</Radio>
        <Radio value={4}>Test2</Radio>
      </RadioGroup>
    );

    const radios = findDOMNode(instance).querySelectorAll('.radio');
    ReactTestUtils.Simulate.change(radios[2].querySelector('input'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
