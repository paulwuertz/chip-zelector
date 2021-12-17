import os, json
from devicetree import edtlib, dtlib

# Get a list of all dts-board files
dts_path = "dts_temp/"

interesting_props = [
    "timer", "gpio", "memory", "cpu", "rtc", "i2c", "spi", "uart",
    "usart", "adc", "dac", "pwm", "usb", "ethernet", "sdmmc"
    "flash", "can", "timers", "serial", "wdg", "quadspi"
]
board_interesting_feature_map = {}

#
# Extract some features as dt tree
#
boards = [f for f in os.listdir(dts_path) if f.endswith(".dts")]
for board in boards:
    board_name = board.replace(".dts", "")
    props = {p:[] for p in interesting_props}
    dt = dtlib.DT("dts_temp/"+board)
    for n in dt.node_iter():
        prop = n.name.split("@")[0]
        if prop in interesting_props:
            props[prop] += [n]
    board_interesting_feature_map[board_name] = props

#
# Features dt to simpler json
#
json_board_props = {}
for board_name, dt_preselect_props in board_interesting_feature_map.items():
    json_board_prop = {}

    if "flash" in dt_preselect_props:
        json_board_prop["flash"] = [{
            "size": f.props["reg"].to_nums()[1]
        } for f in dt_preselect_props["flash"]]

    if "memory" in dt_preselect_props:
        json_board_prop["memory"] = [{
            "label": f.props["label"].to_string() if "label" in f.props else "NO_LABEL",
            "size": f.props["reg"].to_nums()[1]
        } for f in dt_preselect_props["memory"]]

    #"cpu"  TODO
    #"rtc"  TODO
    #"timers", "timer", "rtc", "wdg" TODO

    # How many and which pin - peripherals:
    for periph in [
        "gpio", "i2c", "spi", "uart", "can", "serial", "quadspi",
        "usart", "adc", "dac", "pwm", "usb", "ethernet"
    ]:
        json_board_prop[periph] = [{
            "label": f.props["label"].to_string() if "label" in f.props else "NO_LABEL"
        } for f in dt_preselect_props[periph]]

    json_board_props[board_name] = json_board_prop

print(json.dumps(json_board_prop, indent=4, ensure_ascii=False))
