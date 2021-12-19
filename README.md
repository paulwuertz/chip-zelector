# Chip Zelector

Clone this into the `/zephyrproject/zephyr/dts/` folder and execute the following commands there:

```
build_all_dts.sh
pip install -r requirements.txt
python socmap.py
cd static_filter_app/
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
    * [ ] add filterable/sortable architecture to each chip
    * [ ] add controllers images
    * [ ] show applied filters as chips (like on mouser.com)
    * [ ] add column filter (which cols to hide to make the table fit a normal screen)
    * [ ] list of controllers
    * [ ] detailed view of all controller features
    * [ ] export min-max of peripeherals & memory from real devices/boards
    * [ ] link boards to docs.zephyrproject (maybe add board page as routed sub-page)
* [ ] brainstorm about handy features
    * [ ] displaying pins and check for possible assignment of selected peripherals
    * [ ] generate overlay with selected features on controller page
    * [ ] add option to add sensors to peripheral bus
    * [ ] ...
