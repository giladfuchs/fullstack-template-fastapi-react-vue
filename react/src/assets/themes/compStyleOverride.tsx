import type { CustomTypography } from './types';

export default function componentStyleOverrides(theme: CustomTypography) {
    const bgColor = theme.customization.navType === 'dark' ? theme.colors.darkBackground : theme.colors.grey50;

    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    borderRadius: '4px'
                }
            }
        },

        MuiPaper: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
                root: { backgroundImage: 'none' },
                rounded: { borderRadius: '0.7rem' }
            }
        },

        MuiCardHeader: {
            styleOverrides: {
                root: { color: theme.colors.textDark, padding: '24px' },
                title: { fontSize: '1.125rem' }
            }
        },

        MuiCardContent: {
            styleOverrides: { root: { padding: '24px' } }
        },

        MuiCardActions: {
            styleOverrides: { root: { padding: '24px' } }
        },

        MuiAlert: {
            styleOverrides: {
                root: { alignItems: 'center' },
                outlined: { border: '1px dashed' }
            }
        },

        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: theme.darkTextPrimary,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    '&.Mui-selected': {
                        color: theme.menuSelected,
                        backgroundColor: theme.menuSelectedBack,
                        '&:hover': { backgroundColor: theme.menuSelectedBack },
                        '& .MuiListItemIcon-root': { color: theme.menuSelected }
                    },
                    '&:hover': {
                        backgroundColor: theme.menuSelectedBack,
                        color: theme.menuSelected,
                        '& .MuiListItemIcon-root': { color: theme.menuSelected }
                    }
                }
            }
        },

        MuiListItemIcon: {
            styleOverrides: { root: { color: theme.darkTextPrimary, minWidth: '36px' } }
        },

        MuiListItemText: {
            styleOverrides: { primary: { color: theme.textDark } }
        },

        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: theme.textDark,
                    '&::placeholder': { color: theme.darkTextSecondary, fontSize: '0.875rem' }
                }
            }
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: bgColor,
                    borderRadius: '0.7rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.customization.navType === 'dark' ? `${theme.colors.darkTextPrimary}28` : theme.colors.grey400
                    },
                    '&:hover $notchedOutline': { borderColor: theme.colors.primaryLight },
                    '&.MuiInputBase-multiline': { padding: 1 }
                },
                input: {
                    fontWeight: 500,
                    background: bgColor,
                    padding: '15.5px 14px',
                    borderRadius: '0.7rem',
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': { paddingLeft: 0 }
                    }
                },
                inputAdornedStart: { paddingLeft: 4 },
                notchedOutline: { borderRadius: '0.7rem' }
            }
        },

        MuiSlider: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: theme.customization.navType === 'dark' ? `${theme.colors.darkTextPrimary}50` : theme.colors.grey300
                    }
                },
                mark: { backgroundColor: theme.paper, width: '4px' },
                valueLabel: {
                    color: theme.customization.navType === 'dark' ? theme.colors.primaryMain : theme.colors.primaryLight
                }
            }
        },

        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    '& .MuiAutocomplete-tag': {
                        background:
                            theme.customization.navType === 'dark' ? `${theme.colors.darkTextPrimary}20` : theme.colors.secondaryLight,
                        borderRadius: 4,
                        color: theme.textDark,
                        '.MuiChip-deleteIcon': {
                            color: theme.customization.navType === 'dark' ? `${theme.colors.darkTextPrimary}80` : theme.colors.secondary200
                        }
                    }
                },
                popper: {
                    borderRadius: '0.7rem',
                    boxShadow: '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)'
                }
            }
        },

        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.divider,
                    opacity: theme.customization.navType === 'dark' ? 0.2 : 1
                }
            }
        },

        MuiSelect: {
            styleOverrides: { select: { '&:focus': { backgroundColor: 'transparent' } } }
        },

        MuiCheckbox: {
            styleOverrides: { root: {} }
        },

        MuiAvatar: {
            styleOverrides: {
                root: {
                    color: theme.customization.navType === 'dark' ? theme.colors.darkLevel1 : theme.colors.primaryDark,
                    background: theme.customization.navType === 'dark' ? theme.darkTextPrimary : theme.colors.primary200
                }
            }
        },

        MuiChip: {
            styleOverrides: {
                root: { '&.MuiChip-deletable .MuiChip-deleteIcon': { color: 'inherit' } }
            }
        },

        MuiTimelineContent: {
            styleOverrides: { root: { color: theme.textDark, fontSize: '16px' } }
        },

        MuiTreeItem: {
            styleOverrides: { label: { marginTop: 14, marginBottom: 14 } }
        },

        MuiTimelineDot: {
            styleOverrides: { root: { boxShadow: 'none' } }
        },

        MuiInternalDateTimePickerTabs: {
            styleOverrides: {
                tabs: {
                    backgroundColor: theme.customization.navType === 'dark' ? theme.colors.darkPaper : theme.colors.primaryLight,
                    '& .MuiTabs-flexContainer': {
                        borderColor: theme.customization.navType === 'dark' ? `${theme.colors.darkTextPrimary}20` : theme.colors.primary200
                    },
                    '& .MuiTab-root': {
                        color: theme.customization.navType === 'dark' ? theme.colors.darkTextSecondary : theme.colors.grey900
                    },
                    '& .MuiTabs-indicator': { backgroundColor: theme.colors.primaryDark },
                    '& .Mui-selected': { color: theme.colors.primaryDark }
                }
            }
        },

        MuiTabs: {
            styleOverrides: {
                flexContainer: {
                    borderBottom: '1px solid',
                    borderColor: theme.customization.navType === 'dark' ? `${theme.colors.darkTextPrimary}20` : theme.colors.grey200
                }
            }
        },

        MuiDialog: {
            styleOverrides: { paper: { padding: '12px 0 12px 0' } }
        },

        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: theme.customization.navType === 'dark' ? `${theme.colors.darkTextPrimary}15` : theme.colors.grey200,
                    '&.MuiTableCell-head': {
                        fontSize: '0.875rem',
                        color: theme.heading,
                        fontWeight: 500
                    }
                }
            }
        },

        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    color: theme.customization.navType === 'dark' ? theme.colors.darkLevel1 : theme.paper,
                    background: theme.customization.navType === 'dark' ? theme.colors.grey50 : theme.colors.grey700
                }
            }
        },

        MuiDialogTitle: {
            styleOverrides: { root: { fontSize: '1.25rem' } }
        }
    };
}
