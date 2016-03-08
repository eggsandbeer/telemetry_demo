var BaseStyles = {
  // Styles applied at topmost level of app
  'main': {
    fontFamily: "myriad-pro",
    fontSize: "14px",
    overflow: 'hidden',
    height: '100vh',
    display: 'table',
    width: '100%'
  },
  // Helpers
  floatleft: {
    float: 'left'
  },
  floatright: {
    float: 'right'
  },
  'positionAlert': {
    width: '98%',
    position: 'fixed',
    top: 0,
    left: 0,
    margin: '1%',
    zIndex: 1
  },
  inputError: {
    border: '2px solid #BB0000',
    backgroundColor: '#F2DEDE'
  },
  // Colors
  'backGroundColor': '#f4f4f4',
  'mainFontColor': '#02000e',
  'secondaryFontColor': '#948f97',
  'accentColor': '#52b1f0',
  'genericBorderColor': '#e6e6e6',
  'activeColor': '#8269c0',
  // Spacers
  'rowMarginBottom': {
    'marginBottom': '30px'
  },
  // Typography
  'h1': {
    'margin': '0',
    'fontFamily': 'OpenSansBold'
  },
  // Buttons
  button: {
    'width': '100%',
    'backgroundColor': '#f4f4f4',
    'borderRadius': '25px',
    'padding': '12px 30px',
    'textDecoration': 'none',
    'display': 'block',
    'textAlign': 'center',
    ':hover': {
      'textDecoration': 'none'
    }
  },
  buttonShort: {
    maxWidth: '200px'
  },
  blueButton: {
    'color': '#52aef1',
    'border': '2px solid #52aef1',
    ':hover': {
      'border': '2px solid #0768a9',
      'color': '#0768a9'
    }
  },
  blueButtonDisabled: {
    'color': '#bce3ff',
    'border': '2px solid #badbf3'
  },
  grayButton: {
    'color': '#979797',
    'border': '2px solid #d4d2d2',
    ':hover': {
      'border': '2px solid #979797',
      'color': '#7c7c7c'
    }
  },
  grayButtonDisabled: {
    'color': '#e0e0e0',
    'border': '2px solid #e4e4e4'
  },
  blueActionButton: {
    'backgroundColor': '#40a9f1',
    'color': '#ffffff',
    'padding': '11px',
    'border': 'none',
    'borderRadius': '4px',
    'width': '100%',
    ':hover': {
      'backgroundColor': '#3594d5'
    }
  }
}

module.exports = BaseStyles;
