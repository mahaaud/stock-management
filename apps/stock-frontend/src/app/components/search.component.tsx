import { fetchSearchStocks } from "../services/stock.service";
import { AsyncPaginate } from "react-select-async-paginate";

export function StockSearch({ onSearchClicked }: any): any {

    const loadOptions = async (inputValue: string, callback: any) => {
        if (inputValue.length <= 2) {
            callback(null);
        }

        const stockSearchResult = await fetchSearchStocks(inputValue);

            return {
                options: stockSearchResult.map((stock: StockItem) => {
                    return {
                        value: stock,
                        label: `${stock.symbol} - ${stock.name}, ${stock.exchangeShortName} (${stock.currency})`
                    }
                }),
            }
    };

    const onChangeHandler = (enteredData: any) => {
        onSearchClicked(enteredData);
    };

    /*let useClickOutside = (handler: any) => {
        let domNode = useRef(null);
        useEffect(() => {
            let maybeHandler = (event: any) => {
                if (!domNode.current.contains(event.target)) {
                    handler();
                }
            };

            document.addEventListener("mousedown", maybeHandler);

            return () => {
                document.removeEventListener("mousedown", maybeHandler);
            };
        });

        return domNode;
    };*/

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