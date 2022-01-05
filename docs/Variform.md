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
async generateData(formElementData: FormElementData, isRoot: boolean = true): Promise<object>
```

**Parameters**

- `formElementData: FormElementData`<br/>
  The formElementData containing the data entered by the user

- `isRoot: boolean = true`<br/>
  This is not meant to be changed, as it is used internally
  for recursive execution of this method

**Return value**

JS object with user data contained in the form as specified in the dataMapping
fields in formElementData

### populateForm()

Populate the current form with data that was generated before using the data
provided in inData. The dataMapping field in formElementData is used to map the
data of inData to the form.

**Syntax**

```typescript
async populateForm(formElementData: FormElementData, inData: any): void
```

**Parameters**

- `formElementData: FormElementData`<br/>
  to be populated with data from inData

- `inData: any`<br/>
  expects an object that was generated with the generateData method

**Return value**

the populated formElementData

### refresh()

**Syntax**

```typescript
refresh(): void
```

