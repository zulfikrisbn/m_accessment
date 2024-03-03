using Assessment.Domain.Entities;

namespace Assessment.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<TodoList> TodoLists { get; }

    DbSet<TodoItem> TodoItems { get; }

    DbSet<Freelancer> Freelancers { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
