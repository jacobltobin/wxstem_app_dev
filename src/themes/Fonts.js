const type = {
  base: 'OpenSans-Regular',
  bold: 'OpenSans-Bold',
  emphasis: 'OpenSans-Italic',
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5,
}

const style = {
  all: {
    fontFamily: type.base,
  },
  header: {
    fontFamily: type.bold,
    color: '#fff',
    fontSize: size.regular,
  },
  subHeader: {
    fontFamily: type.bold,
    fontSize: size.regular,
  },
  detail: {
    fontFamily: type.base,
    fontSize: size.medium,
  },
  detailBold: {
    fontFamily: type.bold,
    fontSize: size.medium,
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
  },
  normalBold: {
    fontFamily: type.bold,
    fontSize: size.regular,
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
  },
}

export default {
  type,
  size,
  style,
}
