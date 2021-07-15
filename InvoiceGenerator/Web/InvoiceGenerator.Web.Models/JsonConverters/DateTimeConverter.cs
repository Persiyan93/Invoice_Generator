
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using InvoiceGenerator.Common;

namespace InvoiceGenerator.Web.Models.JsonConverters
{
    public class DateTimeConverter:JsonConverter<DateTime>
    {
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            DateTime date;
            var test = reader.GetString();
            var IsDateValid = DateTime.TryParseExact(reader.GetString(), "dd.MM.yyyy",
                                       CultureInfo.InvariantCulture, DateTimeStyles.None, out date);
            if (!IsDateValid)
            {
                throw new InvalidUserDataException("Invalid Time format!");
            }
            return date;
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString());
        }
    }
}
