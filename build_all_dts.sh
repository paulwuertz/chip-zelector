mkdir -p dts_temp

while IFS= read -r line; do
  echo west build -p -b $line ../../samples/hello_world
  west build -p -b $line ../../samples/hello_world
  cp build/zephyr/zephyr.dts dts_temp/$line.dts
done < device_list.txt

rm dts_temp/qemu_*
rm dts_temp/xt-sim*
