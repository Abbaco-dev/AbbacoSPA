import React, { Component } from 'react';
import { IDropdownPage, IDropdownAPI } from '../api/models/Dropdowns.model';
import CashFlowClassifierDataService from '../api/services/CashFlowClassifiers.service';
import { Formik, Form, Field } from 'formik';
import CashFlowDataService from '../api/services/CashFlows.service';
import Nav from 'react-bootstrap/Nav';

class SearchFormComponent extends Component<{refreshCashFlows: any}, { dropdownOptions: Array<IDropdownPage> }> {

  constructor(props: any) {
    super(props)
    this.state = { dropdownOptions: new Array<IDropdownPage>() }

    this.onSubmit = this.onSubmit.bind(this)
    this.refreshCashFlowClassifiers = this.refreshCashFlowClassifiers.bind(this);
  }
  
  public onSubmit(values: any) {
  }

  public componentDidMount(): void {
    this.refreshCashFlowClassifiers();
  }

  public refreshCashFlowClassifiers(): void {
    CashFlowClassifierDataService.getAllCashFlowClassifiers()
      .then(
        response => {
          this.setState({ dropdownOptions: this.mapApiDropdownToPage(response.data._embedded.cashFlowClassifierDtoList) })
        }
      )
  }

  private mapApiDropdownToPage(values: Array<IDropdownAPI>): Array<IDropdownPage> {
    const result = values.map(value => new Object({ value: value.id, label: value.name }));
    return result as IDropdownPage[];
  }

  render() {
    let options = this.state.dropdownOptions;
    return (
      <>
        <Nav className="col-12 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky"></div>
          <Formik
            initialValues={Object}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
          >
            {props => (
              <Form className="col-12" >
                <Nav.Item className="col-12">
                  <fieldset className="form-group">
                    <Field
                      className="form-control"
                      type="date"
                      name="creationDate"
                      label="Date"
                      placeholder="Date"
                    />
                  </fieldset>
                </Nav.Item>
                <Nav.Item className="col-12">
                  <fieldset  className="form-group">
                    <Field
                      className="form-control"
                      type="number"
                      name="cashAmount"
                      placeholder="Cash"
                    />
                  </fieldset>
                </Nav.Item>
                <Nav.Item className="col-12">
                  <fieldset className="form-group">
                    <Field
                      className="form-control"
                      type="text"
                      name="title"
                      placeholder="Description"
                    />
                  </fieldset>
                </Nav.Item>

                <button className="btn btn-success offset-2 col-10" type="submit">
                  Save
            </button>
              </Form>
            )}
          </Formik>
        </Nav>

      </>
    );
  }
}

export default SearchFormComponent;