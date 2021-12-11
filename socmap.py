import os
import graphviz

soc_map={}

def track_dependencies(folder, dt_file):
    dt = open(folder+"/"+dt_file).read().split("\n")
    for line in dt:
        if "#include" in line and ".dtsi" in line and "<" in line:
            print(line)
            chip_include_name = line.split("/")[-1][:-1]

            dot.node(name, name)
            dot.node(chip_include_name, chip_include_name)
            dot.edge(dt_file, chip_include_name)

dot = graphviz.Graph('G', filename='dtsi-relations.gv', engine='sfdp')

for root, dirs, files, rootfd in os.fwalk('..'):
    for name in files:
        if ".dtsi" in name:
            track_dependencies(root, name)
            print(root, name)
    # for name in dirs:
    #     pass

dot.view()
#dot.render('dtsi-relations.gv', view=True)
