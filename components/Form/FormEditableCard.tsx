'use client';

import { useEffect, useState } from "react";
import { FieldError, FieldValues, Path, useFieldArray, FieldArrayPath, useFormContext, useWatch, FieldArray } from "react-hook-form";
import { Box, Card, Typography, TextField, Button, IconButton, Collapse } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { QUALITY_OPTIONS, MENU_FIELDS_BY_SITE_TYPE, MENU_FIELD_LABELS, RARITY_OPTIONS } from "@/constants/site/menu.options"
import FormSelect from "./FormSelect";
import { toSelectOptions } from "@/lib/util/formatSelectOptions";
import { capitalizeFirstLetter } from "@/lib/util/stringFormats";
import { getCategoryOptions } from "@/lib/util/siteHelpers";

type WithSiteMeta = FieldValues & { shopType?: string; guildType?: string };

interface FormEditableCardProps<TFieldValues extends WithSiteMeta = WithSiteMeta> {
  name: FieldArrayPath<TFieldValues>;
  siteType: string;
  header?: string;
  buttonLabel?: string;
  menuWarning?: string;
  onGenerateItems?: (index?: number) => void;
}

function getItemDisplayName<T extends Record<string, unknown>>(
  item: T,
  index: number
): string {
  const priorityFields = ["name", "label", "quality", "rarity"] as const;

  for (const field of priorityFields) {
    const value = item[field];
    if (value) {
      return field === "name"
        ? String(value)
        : `${capitalizeFirstLetter(field)}: ${String(value)}`;
    }
  }

  return `Item ${index + 1}`;
}

export default function FormEditableCard<TFieldValues extends FieldValues>({
  name,
  siteType,
  header,
  onGenerateItems,
  buttonLabel = "Generate",
  menuWarning,
}: FormEditableCardProps<TFieldValues>) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const { fields, append, remove } = useFieldArray<
    TFieldValues,
    FieldArrayPath<TFieldValues>,
    "id"
  >({
    control,
    name,
  });

  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});
  const [liveMessage, setLiveMessage] = useState("");

  const fieldList = MENU_FIELDS_BY_SITE_TYPE[siteType] ?? [];
  const columns = fieldList.map((field) => ({
    field,
    label: MENU_FIELD_LABELS[field] || field,
  }));

  const watchedShopType = useWatch<TFieldValues, Path<TFieldValues>>({
    control,
    name: "shopType" as Path<TFieldValues>,
  });
  const watchedGuildType = useWatch<TFieldValues, Path<TFieldValues>>({
    control,
    name: "guildType" as Path<TFieldValues>,
  });

  const disableGenerate =
    (siteType === "shop" &&
      (!watchedShopType || watchedShopType === "random")) ||
    (siteType === "guild" &&
      (!watchedGuildType || watchedGuildType === "random"));

  type ItemType = FieldArray<TFieldValues, FieldArrayPath<TFieldValues>>;

  const handleAdd = () => {
    const newItem: ItemType = Object.fromEntries(
      fieldList.map((f) => [f, ""])
    ) as ItemType;

    append(newItem);
  };

  useEffect(() => {
    setExpandedMap((prev) => {
      const updated = { ...prev };
      fields.forEach((field) => {
        if (updated[field.id] === undefined) {
          updated[field.id] = true;
        }
      });
      return updated;
    });
  }, [fields]);

  const toggleCard = (
    id: string,
    index: number,
    item: Record<string, unknown>
  ) => {
    const next = !(expandedMap[id] ?? true);

    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    const label = getItemDisplayName(item, index);
    setLiveMessage(`${label} ${next ? "expanded" : "collapsed"}`);
  };

  return (
    <>
      {(header || onGenerateItems) && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {header && <Typography variant="h6">{header}</Typography>}
            {onGenerateItems && (
              <Button
                type="button"
                variant="outlined"
                onClick={() => onGenerateItems?.()}
                size="large"
                disabled={disableGenerate}
                sx={{ py: 1.65 }}
              >
                {buttonLabel}
              </Button>
            )}
          </Box>
          {disableGenerate && (
            <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
              {menuWarning}
            </Typography>
          )}
        </>
      )}

      {fields.map((item, index) => {
        const isExpanded = expandedMap[item.id] ?? true;
        const collapseId = `card-collapse-${item.id}`;
        const headerId = `card-header-${item.id}`;

        return (
          <Card key={item.id} variant="outlined" sx={{ mb: 2, p: 2 }}>
            <Box
              onClick={() => toggleCard(item.id, index, item)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: isExpanded ? 2 : 0,
                cursor: "pointer",
                userSelect: "none",
              }}
              aria-expanded={isExpanded}
              aria-controls={collapseId}
              aria-label={`${isExpanded ? "Collapse" : "Expand"} details for ${getItemDisplayName(
                item,
                index
              )}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleCard(item.id, index, item);
                }
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                id={headerId}
                sx={{ flexGrow: 1 }}
              >
                {getItemDisplayName(item, index)}
              </Typography>

              <Box sx={{ display: "flex" }}>
                {onGenerateItems && (
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      size="small"
                      disabled={disableGenerate}
                      onClick={(e) => {
                        e.stopPropagation();
                        onGenerateItems(index);
                      }}
                    >
                      Conjure Item
                    </Button>
                  </Box>
                )}

                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(index);
                  }}
                  size="medium"
                  sx={{ mt: 1.25, ml: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>

            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <Box role="region" aria-labelledby={headerId} id={collapseId}>
                {columns.map((col) => {
                  const fieldName = `${name}.${index}.${col.field}` as Path<TFieldValues>;
                  const fieldError: FieldError | undefined = (
                    errors?.[name] as Record<number, Record<string, FieldError>>
                  )?.[index]?.[col.field];

                  const isSelectField =
                    col.field === "quality" || col.field === "rarity";
                  const isCategoryField = col.field === "category";

                  return (
                    <Box key={col.field} mb={1}>
                      {!isSelectField && !isCategoryField && (
                        <Typography variant="subtitle2">
                          {col.label}
                        </Typography>
                      )}

                      {isSelectField ? (
                        <FormSelect
                          name={fieldName}
                          label={col.label}
                          control={control}
                          options={
                            col.field === "quality"
                              ? toSelectOptions(QUALITY_OPTIONS)
                              : toSelectOptions(RARITY_OPTIONS)
                          }
                          fieldError={fieldError}
                        />
                      ) : isCategoryField ? (
                        <FormSelect
                          name={fieldName}
                          label={col.label}
                          control={control}
                          options={toSelectOptions(
                            getCategoryOptions(
                              siteType,
                              watchedShopType,
                              (item as Record<string, unknown>)[col.field] as string | undefined
                            )
                          )}
                          fieldError={fieldError}
                        />
                      ) : (
                        <TextField
                          {...register(fieldName)}
                          fullWidth
                          size="small"
                          multiline={col.field === "description"}
                          rows={col.field === "description" ? 3 : 1}
                          error={!!fieldError}
                          helperText={
                            typeof fieldError?.message === "string"
                              ? fieldError.message
                              : ""
                          }
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Collapse>
          </Card>
        );
      })}

      <Box>
        <Button
          variant="outlined"
          onClick={handleAdd}
          disabled={disableGenerate}
        >
          Add Item
        </Button>
      </Box>

      <Box
        aria-live="polite"
        sx={{
          position: "absolute",
          left: -9999,
          top: "auto",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        {liveMessage}
      </Box>
    </>
  );
}
