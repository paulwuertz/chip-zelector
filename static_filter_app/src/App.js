import './App.css';

import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { ProgressBar } from 'primereact/progressbar';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import devices from "./devices.min.json"
// import { CustomerService } from '../service/CustomerService';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const DataTableFilterDemo = () => {
    const [customers2, setCustomers2] = useState(null);
    const [filters2, setFilters2] = useState({
        'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'cpus': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'flash': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'memory': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'gpio': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'uart': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'usart': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'i2c': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'spi': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'can': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'ethernet': { value: null, matchMode: FilterMatchMode.BETWEEN },
    });
    const [globalFilterValue2, setGlobalFilterValue2] = useState('');
    const [loading2, setLoading2] = useState(true);

    // const customerService = new CustomerService();
    useEffect(() => {
        // customerService.getCustomersLarge().then(data => { setCustomers1(getCustomers(data)); setLoading1(false) });
        // customerService.getCustomersLarge().then(data => { setCustomers2(getCustomers(data)); setLoading2(false) });
        setCustomers2(devices);
        setLoading2(false)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const onGlobalFilterChange2 = (e) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2['global'].value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    }

    const renderHeader2 = () => {
        return (
            <div className="p-d-flex p-jc-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }



    // const verifiedBodyTemplate = (rowData) => {
    //     return <i className={classNames('pi', {'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified})}></i>;
    // }
    // const verifiedRowFilterTemplate = (options) => {
    //     return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
    // }

    const activityFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="p-m-3"></Slider>
                <div className="p-d-flex p-ai-center p-jc-between p-px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </React.Fragment>
        )
    }

    const header2 = renderHeader2();

    return (
        <div className="datatable-filter-demo">
            <div className="card">
                <h5>Filter Row</h5>
                <p>Filters are displayed inline within a separate row.</p>
                <DataTable value={customers2} paginator className="p-datatable-customers" rows={10} sortField="name" dataKey="name" filters={filters2} filterDisplay="menu" responsiveLayout="scroll" header={header2} emptyMessage="No matching boards found.">
                    <Column field="name" header="Name" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '6rem' }} />
                    <Column field="cpus.cores_count" header="CPUs" showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }} body={(rowData) => {return <span>{rowData.cpus.cores_count}</span>;}} filter filterElement={activityFilterTemplate} />
                    <Column field="main_flash_size" header="Flash" showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }} body={(rowData) => {return <span>{rowData.main_flash_size/1024} KB</span>;}} filter filterElement={activityFilterTemplate} />
                    <Column field="main_ram_size" header="RAM" showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }} body={(rowData) => {return <span>{rowData.main_ram_size/1024} KB</span>;}} filter filterElement={activityFilterTemplate} />
                    <Column field="gpio.count" header="GPIO Banks" showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }} body={(rowData) => {return <span>{rowData.gpio.count}</span>;}} filter filterElement={activityFilterTemplate} />
                    <Column field="uart.count" header="UART" showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }} body={(rowData) => {return <span>{rowData.uart.count}</span>;}} filter filterElement={activityFilterTemplate} />
                    <Column field="usart.count" header="USART" showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }} body={(rowData) => {return <span>{rowData.usart.count}</span>;}} filter filterElement={activityFilterTemplate} />
                    <Column field="i2c.count" header="I2C" showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }} body={(rowData) => {return <span>{rowData.i2c.count}</span>;}} filter filterElement={activityFilterTemplate} />
                    <Column field="spi.count" header="SPI" showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }} body={(rowData) => {return <span>{rowData.spi.count}</span>;}} filter filterElement={activityFilterTemplate} />
                    <Column field="can.count" header="CAN" showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }} body={(rowData) => {return <span>{rowData.can.count}</span>;}} filter filterElement={activityFilterTemplate} />
                    <Column field="ethernet.count" header="Ethernet" showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }} body={(rowData) => {return <span>{rowData.ethernet.count}</span>;}} filter filterElement={activityFilterTemplate} />
                    {/* <Column field="verified" header="Verified" dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} /> */}
                </DataTable>
            </div>
        </div>
    );
}

export default DataTableFilterDemo;
