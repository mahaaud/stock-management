import { fetchSearchStocks } from "../services/stock.service";
import { AsyncPaginate } from "react-select-async-paginate";

export function StockSearch({ onSearchClicked, onError }: any): any {

    const loadOptions = async (inputValue: string, callback: any) => {
        if (inputValue.length <= 2) {
            callback(null);
        }

        try {
            const stockSearchResult = await fetchSearchStocks(inputValue);

            return {
                options: stockSearchResult.map((stock: StockInfo) => {
                    return {
                        value: stock,
                        label: `${stock.symbol} - ${stock.name}, ${stock.exchangeShortName} (${stock.currency})`
                    }
                }),
            }
        } catch (error) {
            onError();
            console.error(error);
        }
    };

    const onChangeHandler = (enteredData: any) => {
        onSearchClicked(enteredData);
    };

    return (
        <section>
            <AsyncPaginate
                placeholder="Search for stock"
                debounceTimeout={600}
                onChange={onChangeHandler}
                loadOptions={loadOptions}
            />
        </section>
    );
}