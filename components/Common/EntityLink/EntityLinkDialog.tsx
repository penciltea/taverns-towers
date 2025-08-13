import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip, Stack } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React from "react";


type CreateNewOption = { __createNew: true };

interface EntityCreateFormProps<T> {
    onSuccess: (entity: T) => void;
    onCancel: () => void;
}

interface EntityLinkDialogProps<T> {
    open: boolean;
    onClose: () => void;
    onConfirm: (selected: T[]) => void;

    /** Existing entities to choose from */
    entities: T[];

    /** Currently selected entities (controlled by parent) */
    selected: T[];

    /** Extract unique ID from entity */
    getId: (entity: T) => string;

    /** Extract display label from entity */
    getLabel: (entity: T) => string;

    /** Component for creating a new entity inline */
    createEntityForm?: React.ReactElement<EntityCreateFormProps<T>>;

    /** Optional hook or callback to create new entity programmatically */
    onCreateEntity?: (data: any) => Promise<T>;

    /** Label for UI (“NPC”, “Site”, etc.) */
    entityLabel: string;

    /** Allow multiple selection (true) or single only (false) */
    allowMultiple?: boolean;
}


export default function EntityLinkDialog<T>({
    open,
    onClose,
    onConfirm,
    entities,
    selected,
    getId,
    getLabel,
    createEntityForm,
    onCreateEntity,
    entityLabel,
    allowMultiple = true,
}: EntityLinkDialogProps<T>) {
    const [localSelected, setLocalSelected] = useState<T[]>(selected);
    const [creatingNew, setCreatingNew] = useState(false);

    const options: (T | CreateNewOption)[] = [
        { __createNew: true },
        ...entities,
    ];

    const handleSelect = (value: T | null) => {
        if (!value) return;
        if (allowMultiple) {
        if (!localSelected.some(e => getId(e) === getId(value))) {
            setLocalSelected([...localSelected, value]);
        }
        } else {
        setLocalSelected([value]);
        }
    };

    const handleRemove = (id: string) => {
        setLocalSelected(localSelected.filter(e => getId(e) !== id));
    };

    const handleCreateNew = async (data: any) => {
        if (!onCreateEntity) return;
        const newEntity = await onCreateEntity(data);
        setLocalSelected([...localSelected, newEntity]);
        setCreatingNew(false);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Assign {entityLabel}</DialogTitle>
            <DialogContent>
                {creatingNew ? (
                    <>
                        {createEntityForm &&
                            React.cloneElement<EntityCreateFormProps<T>>(createEntityForm, {
                                onSuccess: handleCreateNew,
                                onCancel: () => setCreatingNew(false),
                            })
                        }
                    </>
                ) : (
                    <>
                        <Autocomplete<T | CreateNewOption>
                            options={options}
                            getOptionLabel={(option) =>
                                (option as CreateNewOption).__createNew
                                ? `➕ Create New ${entityLabel}`
                                : getLabel(option as T)
                            }
                            isOptionEqualToValue={(opt, val) => {
                                if ((opt as CreateNewOption).__createNew && (val as CreateNewOption).__createNew) return true;
                                return getId(opt as T) === getId(val as T);
                            }}
                            onChange={(_, value) => {
                                if (!value) return;
                                if ((value as CreateNewOption).__createNew) {
                                setCreatingNew(true);
                                return;
                                }
                                handleSelect(value as T);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label={`Select ${entityLabel}`} variant="outlined" />
                            )}
                        />

                        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                            {localSelected.map((entity) => (
                                <Chip
                                    key={getId(entity)}
                                    label={getLabel(entity)}
                                    onDelete={() => handleRemove(getId(entity))}
                                />
                            ))}
                        </Stack>
                    </>
                )}
            </DialogContent>
            {!creatingNew && (
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                        onConfirm(localSelected);
                        onClose();
                        }}
                        variant="contained"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
}
