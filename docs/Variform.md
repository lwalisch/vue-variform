# Variform

## Slots

| Name       | Description |
| ---------- | ----------- |
| `slotName` | &nbsp;      |

## Props

| Name                | Type                        | Description |
| ------------------- | --------------------------- | ----------- |
| `form-element-data` | `FormElementData`           |             |
| `slot-names`        | `Array<string>`             |             |
| `converters`        | `{[key: string]: Function}` |             |
| `validators`        | `{[key: string]: Function}` | &nbsp;      |

## Data

| Name       | Type     | Description | Initial value |
| ---------- | -------- | ----------- | ------------- |
| `rerender` | `number` |             | `0`           |
| `outData`  | `object` |             | `{}`          |

## Methods

### generateData()

Use the information from the dataMapping fields in FormElementData to create a
formatted output
of the content captured in the application form.

**Syntax**

```typescript
async generateData(formElementData: FormElementData, isRoot: boolean = true): void
```

**Parameters**

- `formElementData: FormElementData`<br/>
  The formElementData containing the data entered by the user

- `isRoot: boolean = true`<br/>
  This is not meant to be changed, as it is used internally
  for recursive execution of this method

### populateForm()

formElementData expects the INITIAL forrmElementData, not the formElement data
in the state where generateData was executed

**Syntax**

```typescript
async populateForm(formElementData: FormElementData, inData: any): void
```

### refresh()

**Syntax**

```typescript
refresh(): void
```

