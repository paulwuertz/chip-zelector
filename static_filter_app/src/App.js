import './App.css';

import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import devices from "./devices.min.json"
// import { CustomerService } from '../service/CustomerService';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const DataTableFilterDemo = () => {
    const [filters2, setFilters2] = useState({
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]  },
        'cpus.cores_count': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'main_flash_size': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'main_ram_size': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'gpio.count': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'adc.count': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'dac.count': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'pwm.count': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'uart.count': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'usart.count': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'i2c.count': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'spi.count': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'quadspi.count': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'can.count': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'usb.count': { value: null, matchMode: FilterMatchMode.BETWEEN},
        'ethernet.count': { value: null, matchMode: FilterMatchMode.BETWEEN},
    });

    const columns = [
        {field:"cpus.cores_count", header:"CPUs",  range: [0,2], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.cpus.cores_count}</>;}},
        {field:"main_flash_size", header:"Flash",  step:1024, range: [0,131072], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.main_flash_size/1024} KB</>;}},
        {field:"main_ram_size", header:"RAM",      step:1024, range: [0,2097152], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.main_ram_size/1024} KB</>;}},
        {field:"gpio.count", header:"GPIO Banks",  range: [0,16], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.gpio.count}</>;}},
        {field:"adc.count", header:"ADC",          range: [0,4], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.adc.count}</>;}},
        {field:"dac.count", header:"DAC",          range: [0,4], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.dac.count}</>;}},
        {field:"pwm.count", header:"PWM",          range: [0,14], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.pwm.count}</>;}},
        {field:"uart.count", header:"UART",        range: [0,14], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.uart.count}</>;}},
        {field:"usart.count", header:"USART",      range: [0,6], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.usart.count}</>;}},
        {field:"i2c.count", header:"I2C",          range: [0,15], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.i2c.count}</>;}},
        {field:"spi.count", header:"SPI",          range: [0,6], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.spi.count}</>;}},
        {field:"quadspi.count", header:"Quad-SPI", range: [0,1], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.quadspi.count}</>;}},
        {field:"can.count", header:"CAN",          range: [0,3], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.can.count}</>;}},
        {field:"usb.count", header:"USB",          range: [0,2], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.usb.count}</>;}},
        {field:"ethernet.count", header:"Ethernet",range: [0,2], showFilterMatchModes:false, sortable: true, cellFn: (rowData) => {return <>{rowData.ethernet.count}</>;}},
    ];
    const [selectedColumns, setSelectedColumns] = useState(columns);

    useEffect(() => {
        // setCustomers2(devices);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // TODO tristate-checkbox with randomnumber generator and crypto?
    // const verifiedBodyTemplate = (rowData) => {
    //     return <i className={classNames('pi', {'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified})}></i>;
    // }
    // const verifiedRowFilterTemplate = (options) => {
    //     return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
    // }

    const onColumnToggle = (event) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = columns.filter(col => selectedColumns.some(sCol => sCol.field === col.field));
        setSelectedColumns(orderedSelectedColumns);
    }

    const renderHeader = () => {
        return (
            <div className="p-d-flex p-jc-end">
                <div style={{ textAlign:'left' }}>
                    <small>Filter displayed columns:</small> <MultiSelect value={selectedColumns} options={columns} optionLabel="header" onChange={onColumnToggle} style={{width:'20em'}}/>
                </div>
            </div>
        )
    }

    const header = renderHeader();

    const columnComponents = selectedColumns.map(col=> {
        return <
            Column key={col.field} field={col.field} header={col.header}
            showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }}
            body={col.cellFn} filter filterElement={(options) =>
                    <>
                        <Slider value={options.value ? options.value : col.range}
                            onChange={(e) => options.filterCallback(e.value)} range
                            min={col.range[0]} max={col.range[1]} step={col.step ? col.step : 1 } className="p-m-3"></Slider> <br/>
                        <div className="p-d-flex p-ai-center p-jc-between p-px-2">
                            <span>{options.value ? options.value[0] : col.range[0]}</span> {" - "}
                            <span>{options.value ? options.value[1] : col.range[1]}</span>
                        </div>
                    </>}
        />;
    });

    return (
        <div className="datatable-doc-demo">
        <div className="card">
        <div className="datatable-filter-demo">
            <div className="card">
                <DataTable value={devices} paginator className="p-datatable-customers" rows={15} header={header} sortField="name" dataKey="name" filters={filters2} rowsPerPageOptions={[10,15,20]}
                 filterDisplay="menu" responsiveLayout="scroll" emptyMessage="No matching boards found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} devices complying to your specifications"
                 paginatorTemplate='RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport'>
                    <Column field="name" header="Name" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '6rem' }} />
                    {columnComponents}
                    {/*  <Column field="verified" header="Verified" dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} /> */}
                </DataTable>
            </div>
        </div>
        </div>
        </div>
    );
}

export default DataTableFilterDemo;
