using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public static  class QuerableExtension
    {
        public static IQueryable<TEntity> CustomOrderBy<TEntity>(this IQueryable<TEntity> source, string orderByProperty,
                          bool desc)
        {
            string command = desc ? "OrderByDescending" : "OrderBy";
            var type = typeof(TEntity);
            var property = type.GetProperty(orderByProperty);
            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);
            var resultExpression = Expression.Call(typeof(Queryable), command, new Type[] { type, property.PropertyType },
                                          source.Expression, Expression.Quote(orderByExpression));
            return source.Provider.CreateQuery<TEntity>(resultExpression);
        }

        public static class ExpressionBuilder
        {

            public static Expression<Func<T, bool>> ContainsText<T>(string propertyName, string text)
            {
                var paramExp = Expression.Parameter(typeof(T), "type");
                var propExp = Expression.Property(paramExp, propertyName);
                var methodInfo = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                var valueExp = Expression.Constant(text, typeof(string));
                var methCall = Expression.Call(propExp, methodInfo, valueExp);
                return Expression.Lambda<Func<T, bool>>(methCall, paramExp);
            }

        }
        public static IQueryable<T> ContainsText<T>(this IQueryable<T> source, Expression<Func<T, string>> selector, string text)
        {
            if (source == null)
            {
                throw new ArgumentNullException();
            }
            if (string.IsNullOrEmpty(text))
            {
                return source;
            }
            string propName = ((MemberExpression)selector.Body).Member.Name;
            return source.Where(ExpressionBuilder.ContainsText<T>(propName, text));
        }

    }
}
