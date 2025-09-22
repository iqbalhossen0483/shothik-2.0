// @mui
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
          overflowY: 'scroll',
          overflowY: 'overlay',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#__next': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        ul: {
          margin: 0,
          padding: 0,
        },
        '::-webkit-scrollbar': {
          width: '6px',
          position: 'absolute',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#DFE3E8',
          borderRadius: '5px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#C4CDD5',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '::-webkit-scrollbar-corner': {
          backgroundColor: '#f1f1f1',
        },
        '::-webkit-scrollbar-track-piece': {
          backgroundColor: 'transparent',
        },
        '::-webkit-scrollbar-track-piece:start': {
          margin: '3px',
        },
        '::-webkit-scrollbar-track-piece:end': {
          margin: '3px',
        },
        '::-webkit-scrollbar-thumb:vertical': {
          borderRadius: '5px',
        },
        '::-webkit-scrollbar-thumb:horizontal': {
          borderRadius: '5px',
        },
        'input:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px transparent inset !important', // Change background color
          transition: 'background-color 5000s ease-in-out 0s',
        },
        'input:autofill': {
          boxShadow: '0 0 0 100px transparent inset', // For Firefox
        },
      }}
    />
  );

  return inputGlobalStyles;
}
