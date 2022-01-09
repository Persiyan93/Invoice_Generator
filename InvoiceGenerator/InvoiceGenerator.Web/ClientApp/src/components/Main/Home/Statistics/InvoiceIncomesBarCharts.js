import { useState } from 'react';
import {Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line,ResponsiveContainer } from 'recharts';
import useFetchGet from '../../../../hooks/useFetchGet';
import apiEndpoints from '../../../../services/apiEndpoints';

const months = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']



export default function InvoiceIncomesBarCharts() {
    const [incomes, setIncomes] = useState([]);

    //Get incomes
    const [getIncomesTriger, setGetIncomesTriger] = useState(true);
    useFetchGet(apiEndpoints.getIncomes, setIncomes, getIncomesTriger, setGetIncomesTriger);


    function convertMonthsName() {
        let result = incomes.map(x => ({ ...x, month: months[x.month - 1] }))
        return result;
    }
    return (

        <ResponsiveContainer width="100%" height={360}>
        <ComposedChart  data={convertMonthsName()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
            <XAxis dataKey="month" />
            <YAxis yAxisId={1} orientation="right" label={{ value: 'Брой на Фактурите', angle: -90 }} />
            <YAxis yAxisId={2} label={{ value: 'Приходи в левове', angle: -90, offset: -5, position: 'outsideLeft', unit: 'лв.' }} />
            <Tooltip unit='лв.' />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar yAxisId={2} dataKey="incomes" barSize={40} fill="#413ea0" unit="лв." name='Приходи' />
            <Line yAxisId={1} type="monotone" dataKey="invoicesCount" name='Брой на фактурите' stroke="#ff0000" />
            </ComposedChart>
            </ResponsiveContainer>
           



    );

}



