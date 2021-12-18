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
    const [loading2, setLoading2] = useState(false);

    useEffect(() => {
        setCustomers2(devices);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // TODO tristate-checkbox with randomnumber generator and crypto?
    // const verifiedBodyTemplate = (rowData) => {
    //     return <i className={classNames('pi', {'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified})}></i>;
    // }
    // const verifiedRowFilterTemplate = (options) => {
    //     return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
    // }

    const periphFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="p-m-3"></Slider>
                <div className="p-d-flex p-ai-center p-jc-between p-px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 15}</span>
                </div>
            </React.Fragment>
        )
    }

    const ethFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="p-m-3"></Slider>
                <div className="p-d-flex p-ai-center p-jc-between p-px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 2}</span>
                </div>
            </React.Fragment>
        )
    }

    const flashFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="p-m-3"></Slider>
                <div className="p-d-flex p-ai-center p-jc-between p-px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 131072}</span>
                </div>
            </React.Fragment>
        )
    }

    const ramFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="p-m-3"></Slider>
                <div className="p-d-flex p-ai-center p-jc-between p-px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 2097152}</span>
                </div>
            </React.Fragment>
        )
    }

    return (

        <div className="layout-main-container">
        <div className="layout-main">
        <div className="datatable-filter-demo">
            <div className="card">
                <DataTable value={customers2} paginator className="p-datatable-customers" rows={10} sortField="name" dataKey="name" filters={filters2}
                 filterDisplay="menu" responsiveLayout="scroll" emptyMessage="No matching boards found.">
                    <Column field="name" header="Name" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '6rem' }} />
                    <Column field="cpus.cores_count" header="CPUs"   showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }}
                        body={(rowData) => {return <span>{rowData.cpus.cores_count}</span>;}} filter filterElement={flashFilterTemplate} />
                    <Column field="main_flash_size" header="Flash"   showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }}
                        body={(rowData) => {return <span>{rowData.main_flash_size/1024} KB</span>;}} filter filterElement={ramFilterTemplate} />
                    <Column field="main_ram_size" header="RAM"       showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }}
                        body={(rowData) => {return <span>{rowData.main_ram_size/1024} KB</span>;}} filter filterElement={periphFilterTemplate} />
                    <Column field="gpio.count" header="GPIO Banks"   showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }}
                        body={(rowData) => {return <span>{rowData.gpio.count}</span>;}} filter filterElement={periphFilterTemplate} />
                    <Column field="uart.count" header="UART"         showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }}
                        body={(rowData) => {return <span>{rowData.uart.count}</span>;}} filter filterElement={periphFilterTemplate} />
                    <Column field="usart.count" header="USART"       showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }}
                        body={(rowData) => {return <span>{rowData.usart.count}</span>;}} filter filterElement={periphFilterTemplate} />
                    <Column field="i2c.count" header="I2C"           showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }}
                        body={(rowData) => {return <span>{rowData.i2c.count}</span>;}} filter filterElement={periphFilterTemplate} />
                    <Column field="spi.count" header="SPI"           showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }}
                        body={(rowData) => {return <span>{rowData.spi.count}</span>;}} filter filterElement={periphFilterTemplate} />
                    <Column field="can.count" header="CAN"           showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }}
                        body={(rowData) => {return <span>{rowData.can.count}</span>;}} filter filterElement={periphFilterTemplate} />
                    <Column field="ethernet.count" header="Ethernet" showFilterMatchModes={false} sortable style={{ minWidth: '2rem' }}
                        body={(rowData) => {return <span>{rowData.ethernet.count}</span>;}} filter filterElement={ethFilterTemplate} />
                    {/* <Column field="verified" header="Verified" dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} /> */}
                </DataTable>
            </div>
        </div>
        </div>
        </div>
    );
}

export default DataTableFilterDemo;
