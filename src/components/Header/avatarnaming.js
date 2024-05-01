
function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  export default function StringAvatar(name) {
    let namevalue;
    if (/\s/.test(name)) {
      const temp = name.split(' ');
      namevalue = temp[0][0] + temp[1][0];
  } else {
    const temp = [...name];
    namevalue = temp[0] + temp[1];
  }
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 50,
        height: 50,
      },
      children: namevalue.toUpperCase()

    };
  }