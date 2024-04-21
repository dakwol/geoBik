import { DataPressActionEnum, SetDataPressAction, ClearDataPressAction } from "./types";
import { IDataPress } from "../../../models/IDataPress";

export const SearchActionCreators = {
  setSearchDataPress: (fieldName: string, fieldValue: string | boolean): SetDataPressAction => ({
    type: DataPressActionEnum.SET_DATAPRESS,
    fieldName,
    fieldValue,
  }),
  clearSearchDataPress: (): ClearDataPressAction => ({
    type: DataPressActionEnum.CLEAR_DATAPRESS,
  }),
};
