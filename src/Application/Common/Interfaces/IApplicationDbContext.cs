using Assessment.Domain.Entities;

namespace Assessment.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Freelancer> Freelancers { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
