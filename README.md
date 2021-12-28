# Chip Zelector

Build the zepyhr docs as described in [here](https://docs.zephyrproject.org/latest/guides/docs/index.html) first.

Clone this into the `/zephyrproject/zephyr/dts/` folder and execute the following commands there:

```
build_all_dts.sh
pip install -r requirements.txt
python socmap.py
cd static_filter_app/
cp -r ../../../doc/_build/html/_images/ public/
npm install
cp ../device_json_temp/devices.min.json src/
npm start
```

WIP - A tool supposed to select chips supported by zephyr by features.

### Requirements

* zephyrsdk + project installed

### TODO

* [x] export to json
* [ ] export to sqlite or indexedDB
* [x] display + filter in simple react dummy
    * [x] list of controllers
    * [x] add filterable/sortable architecture to each chip
    * [x] detailed view of all controller features from zephyr-docs board doc
    * [x] add controllers images
    * [ ] fix CPU count in device tree extraction
    * [ ] add MHz as range to each chip
    * [ ] add URL encoded filter state to send pre-selected parts via messges to sbd.
    * [ ] show applied filters as chips (like on mouser.com)
    * [ ] add column filter (which cols to hide to make the table fit a normal screen)
    * [ ] export min-max of peripeherals & memory from real devices/boards
    * [ ] link boards to docs.zephyrproject (maybe add board page as routed sub-page)
    * [ ] add price/1k units
* [ ] brainstorm about handy features
    * [ ] displaying pins and check for possible assignment of selected peripherals
    * [ ] generate overlay with selected features on controller page
    * [ ] add option to add sensors to peripheral bus
    * [ ] ...
