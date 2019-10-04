declare class RecordComparison {
  constructor(
    masterArray: Array<object>,
    detailArray: Array<object> | Array<Array<object>>
  )
  private master: Array<object>
  private details: Array<object> | Array<Array<object>>
  private currentRow: object
  private detailRow: object
  private masterFields: Array<{ field: string; order?: 'ASC' | 'DESC' }> | null
  private detailFields: Array<{ field: string; order?: 'ASC' | 'DESC' }> | null
  private detailFieldsArr: Array<
    Array<{ field: string; order?: 'ASC' | 'DESC' }>
  > | null
  private masterEof: boolean
  private isSorted: boolean
  protected compare(index?: number): boolean
  protected getMasterBookMark(): number
  protected getDetailBookMark(): number
  protected masterMoveNext(): void
  protected detailMoveNext(): void
}

export default RecordComparison
